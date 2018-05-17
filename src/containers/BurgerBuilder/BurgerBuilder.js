import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  constructor() {
    super();

    this.state = {
      purchasing: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/ingredients.json')
      .then(ingredients => this.setState({ ingredients: ingredients.data }))
      .catch(error => this.setState({ error: true }));
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    this.props.history.push('/checkout');
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).reduce((accumulator, item) => accumulator + ingredients[item], 0);
    console.log('[BurgerBuilder]', sum);
    return sum > 0;
  }

  render() {
    const disabledInfo = { ...this.props.ingredients };

    for (let key of Object.keys(disabledInfo)) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded.bind(this)}
            ingredientRemoved={this.props.onIngredientRemoved.bind(this)}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseState.call(this, this.props.ingredients)}
            ordered={this.purchaseHandler.bind(this)}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler.bind(this)}
          purchaseContinued={this.purchaseContinueHandler.bind(this)}
          price={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler.bind(this)}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded(ingredientName) {
      dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName });
    },
    onIngredientRemoved(ingredientName) {
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));