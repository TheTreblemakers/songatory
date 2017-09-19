import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const updateUsername = username => ({ type: UPDATE_USERNAME, username });
// const updatePassword = password => ({ type: UPDATE_PASSWORD, password });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data));
        history.push('/home');
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const changeUsername = (email, id) =>
  dispatch =>
    axios.put(`/api/users/username/${id}`, { email })
      .then(res => {
        dispatch(updateUsername(res.data.email));
      })
      .catch(err => console.log(err));

// export const changePassword = (password, id) =>
//   dispatch =>
//     axios.put(`/api/users/${id}`, { password })
//       .then(res => {
//         dispatch(updatePassword(res.data.password));
//       })
//       .catch(err => console.log(err));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(() => {
        dispatch(removeUser());
        history.push('/');
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case UPDATE_USERNAME:
      return {...state, email: action.username};
    case UPDATE_PASSWORD:
      return {...state, password: action.password};
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
