import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component {
  constructor() {
    super();

    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchaseable: false,
      purchasing: false
    };

    this.ingredientPrices = {
      salad: 0.5,
      cheese: 0.4,
      meat: 1.3,
      bacon: 0.7
    }
  }

  purchaseHandler() {
    this.setState({purchasing: true});
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

    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
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
  }
}

export default BurgerBuilder;