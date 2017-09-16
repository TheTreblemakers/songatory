import axios from 'axios';
// import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USERORDERS = 'GET_USERORDERS';

/**
 * INITIAL STATE
 */
const defaultOrders = [];

/**
 * ACTION CREATORS
 */
const getUserOrders = orders => ({ type: GET_USERORDERS, orders });

/**
 * THUNK CREATORS
 */
export const fetchUserOrders = () => dispatch => {
  
  axios.get(`/api/orders/`)
    .then(res => {
      dispatch(getUserOrders(res.data || defaultOrders));
    })
    .catch(err => console.error('Fetching orders unsuccessful', err));
};

/**
 * REDUCER
 */
export default function reducer(orders = defaultOrders, action) {
  switch (action.type) {
    case GET_USERORDERS:
      return action.orders;
    default:
      return orders;
  }
}
