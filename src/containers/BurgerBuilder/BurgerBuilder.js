import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  constructor() {
    super();

    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
    };

    this.ingredientPrices = {
      salad: 0.5,
      cheese: 0.4,
      meat: 1.3,
      bacon: 0.7
    }
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/ingredients.json')
      .then(ingredients => this.setState({ ingredients: ingredients.data }))
      .catch(error => this.setState({error: true}));
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    const queryParams = [];
    for (let i of Object.keys(this.state.ingredients)) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
    }

    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = queryParams.join('&');
    console.log(queryString);

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).reduce((accumulator, item) => accumulator + ingredients[item], 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const priceAddtion = this.ingredientPrices[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddtion;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount - 1;
    if (newCount >= 0) {
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = newCount;
      const priceAddtion = this.ingredientPrices[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddtion;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };

    for (let key of Object.keys(disabledInfo)) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler.bind(this)}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler.bind(this)}
          purchaseContinued={this.purchaseContinueHandler.bind(this)}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);