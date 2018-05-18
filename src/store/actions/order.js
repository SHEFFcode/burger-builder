import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData
});

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAILURE,
  error: error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PUCHASE_BURGER_START
});

export const purchaseBurger = (orderData) => (
  (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(response => {
        console.log(response);
        console.log(orderData);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      });
  }
);

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});