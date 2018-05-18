import reducer from './order';
import * as actionTypes from '../actions/actionTypes';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      orders: [],
      loading: false,
      purchased: false
    });
  })
});