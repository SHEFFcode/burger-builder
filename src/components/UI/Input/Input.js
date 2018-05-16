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
    case 'select':
      inputEl = (
        <select 
          className={classes.InputElement} 
          value={props.value}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>)
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