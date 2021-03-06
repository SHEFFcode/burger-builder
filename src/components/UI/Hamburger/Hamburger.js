import React from 'react';
import classes from './Hamburger.css';

const hamburger = (props) => (
  <div onClick={props.click}>
    <div className={classes.Hamburger}></div>
    <div className={classes.Hamburger}></div>
    <div className={classes.Hamburger}></div>
  </div>
);

export default hamburger;