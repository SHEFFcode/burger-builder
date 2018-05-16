import React, { Component } from 'react';
import Order from '../Order/Order';
import axios from '../../axios-orders';
import withErrors from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        let orders = [];
        for (let key of Object.keys(res.data)) {
          orders.push({ ...res.data[key], id: key });
        }
        this.setState({ orders, loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrors(Orders, axios);