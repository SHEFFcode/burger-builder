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

export const fetchOrdersSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => (
  (dispatch) => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
      .then(res => {
        let orders = [];
        if (res.data) {
          for (let key of Object.keys(res.data)) {
            orders.push({ ...res.data[key], id: key });
          }
          dispatch(fetchOrdersSuccess(orders));
        }
      })
      .catch(err => dispatch(fetchOrdersFail(err)));
  }
);