import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';


const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
    return [...Array(props.ingredients[ingredient])].map((_, i) => {
      return <BurgerIngredient key={ingredient + i} type={ingredient} />;
    })
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;