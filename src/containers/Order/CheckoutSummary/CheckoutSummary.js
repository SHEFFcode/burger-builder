import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{width: '100%', margin: 'auto'}}>
      <Burger ingredients={props.ingredients}/>
    </div>
    <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
    <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
  </div>
);

export default checkoutSummary;