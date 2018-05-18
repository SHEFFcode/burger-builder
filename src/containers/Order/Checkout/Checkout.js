import React, { Component } from 'react';
import CheckoutSummary from '../CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Checkout extends Component {
  checkoutCancelledHandler() {
    this.props.history.goBack();
  }

  checkoutContinuedHandler() {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler.bind(this)}
            checkoutContinued={this.checkoutContinuedHandler.bind(this)}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilderReducer.ingredients,
    totalPrice: state.burgerBuilderReducer.totalPrice,
    purchased: state.orderReducer.purchased
  };
}

export default connect(mapStateToProps)(Checkout);