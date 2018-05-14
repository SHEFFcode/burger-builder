import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const CONTROLS = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = () => (
  <div className={classes.BuildControls}>
    {CONTROLS.map((control, index) => (
      <BuildControl key={index} label={control.label} type={control.type} />
    ))}
  </div>
);

export default buildControls;