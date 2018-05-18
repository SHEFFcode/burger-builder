import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const ingredientPrices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const addIngredient = (state, action) => {
  var updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  var updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  var updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + ingredientPrices[action.ingredientName]
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  var updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  var updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  var updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - ingredientPrices[action.ingredientName]
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(state, action);
      break;
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
      break;
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
      break;
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
      break;
    default:
      return state;
      break;
  }
}

