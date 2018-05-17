import React, { Component } from 'react';
import Button from '../../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../../axios-orders';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    },
    loading: false
  }

  orderHandler(e) {
    e.preventDefault();
    const ingredients = this.props.ingredients;
    this.setState({ loading: true });
    const formData = {};
    for (let formElId of Object.keys(this.state.orderForm)) {
      formData[formElId] = this.state.orderForm[formElId].value;
    }

    const order = {
      ingredients,
      price: this.props.totalPrice,
      orderData: formData
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

  inputChangedHandler(inputId, event) {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputId] }; // we need this because call above is not a deep clone
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  }

  checkValidity(value, rules) {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== '';
    }
    return isValid;
  }

  render() {
    const formElementsArr = [];

    for (let key of Object.keys(this.state.orderForm)) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler.bind(this)}>
        {formElementsArr.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={this.inputChangedHandler.bind(this, formElement.id)}
              invalid={formElement.config.invalid}
              shouldValidate={formElement.config.validation}
            />
          );
        })}
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

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

export default connect(mapStateToProps)(ContactData);