import axios from 'axios';

export default axios.create({
  baseURL: 'https://sheffburger-8436c.firebaseio.com/'
});