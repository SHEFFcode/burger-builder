import React, { Component } from 'react';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        totalPrice = param[0];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients, totalPrice });
  }

  checkoutCancelledHandler() {
    this.props.history.goBack();
  }

  checkoutContinuedHandler() {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler.bind(this)}
          checkoutContinued={this.checkoutContinuedHandler.bind(this)}
        />
        <Route 
          path={`${this.props.match.path}/contact-data`} 
          render={(props) => (
            <ContactData 
              {...props}
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />)} 
        />
      </div>
    );
  }
}

export default Checkout;