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
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
  constructor() {
    super();

    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
    this.props.onInitPurchase();
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

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

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
    ingredients: state.burgerBuilderReducer.ingredients,
    totalPrice: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded(ingredientName) {
      dispatch(actions.addIngredient(ingredientName));
    },
    onIngredientRemoved(ingredientName) {
      dispatch(actions.removeIngredient(ingredientName));
    },
    onInitIngredients() {
      dispatch(actions.initIngredients());
    },
    onInitPurchase() {
      dispatch(actions.purchaseInit());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));