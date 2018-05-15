import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[Order Summary]: I am updating');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((ingredient, i) => (
        <li key={i}>
          <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {this.props.ingredients[ingredient]}
        </li>
      ));


    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;