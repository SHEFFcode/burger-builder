import React, { Component } from 'react';
import Button from '../../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler(e) {
    e.preventDefault();
    const ingredients = this.props.ingredients;
    console.log(ingredients);

    this.setState({ loading: true });
    const order = {
      ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Jeremy Shefer',
        address: '353 King Street, San Francisco, CA',
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Your street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Your postal code" />
        <Button btnType="Success" clicked={this.orderHandler.bind(this)}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }


    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;