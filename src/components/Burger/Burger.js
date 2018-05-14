import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';


const burger = (props) => {

  /**
   * Here we flattan the ingredients array.
   * This does not impact react's ability to render the components,
   * as react is able to render nested array jsx.
   */
  let transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
    return [...Array(props.ingredients[ingredient])].map((_, i) => {
      return <BurgerIngredient key={ingredient + i} type={ingredient} />;
    });
  }).reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (transformedIngredients.length < 1) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;