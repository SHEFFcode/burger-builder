import React from 'react';
import classes from './Input.css';

export default (props) => {
  let inputEl = null;
  
  switch (props.elementType) {
    case 'input':
      inputEl = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
      break;
    case 'textarea':
      inputEl = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value}></textarea>
      break;
    default:
      inputEl = <input className={classes.InputElement} {...props.elementConfig} value={props.value}/>
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor="">{props.label}</label>
      {inputEl}
    </div>
  );
};