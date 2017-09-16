import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';

/**
 * INITIAL STATE
 */
const cart = {};

/**
 * ACTION CREATORS
 */
export const getCart = order => ({type: GET_CART, order});


/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  dispatch =>
    axios.get('/api/orders/cart')
      .then(res =>
        dispatch(getCart(res.data || cart)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = cart, action) {
  switch (action.type) {
    case GET_CART:
      return action.order;
    default:
      return state;
  }
}
