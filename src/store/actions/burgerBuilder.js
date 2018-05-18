import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => ({
  type: actionTypes.ADD_INGREDIENTS,
  ingredientName
});

export const removeIngredient = (ingredientName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName
});

const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

const fetchIngredientsFailed = (error) => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
  error
})
export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => dispatch(setIngredients(response.data)))
      .catch(error => dispatch(fetchIngredientsFailed(error)));
  }
};

