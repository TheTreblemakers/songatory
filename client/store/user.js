import axios from 'axios';
import history from '../history';
import { clearCart, mergeCarts, fetchUserCart, fetchGuestCart } from './cart';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
// const defaultUser = null;
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => (dispatch) =>
  axios.get('/auth/me').then((res) => {
    // get appropriate cart here
    dispatch(getUser(res.data || defaultUser));

    if (res.data) {
      // If there is a user, get their cart
      dispatch(fetchUserCart());
    } else {
      dispatch(fetchGuestCart());
    }
  });

export const auth = (email, password, method) => (dispatch) =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then((res) => {
      // get appropriate cart here
      dispatch(getUser(res.data));
      // If there is a cart already, merge carts
      // Merge carts on backend

      dispatch(fetchUserCart());
      history.push('/home');
    })
    .catch((error) => dispatch(getUser({ error })));

export const logout = () => (dispatch) =>
  axios
    .post('/auth/logout')
    .then(() => {
      dispatch(removeUser());
      dispatch(clearCart());
      history.push('/');
    })
    .catch((err) => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
