import axios from 'axios';
import history from '../history';
import { setError } from './error';

/**
 * ACTION TYPES
 */
const GET_CART_ALBUMS = 'GET_CART_ALBUMS';
const GET_CART_SONGS = 'GET_CART_SONGS';
const CLEAR_CART = 'CLEAR_CART';
const SET_PAYMENT = 'SET_PAYMENT_METHOD';
const SET_EMAIL = 'SET_EMAIL';

/**
 * INITIAL STATE
 */
const cart = { email: '', albums: [], songs: [], paymentMethod: '', cart: '' };

/**
 * ACTION CREATORS
 */

export const getCartAlbums = (albums) => ({ type: GET_CART_ALBUMS, albums });
export const getCartSongs = (songs) => ({ type: GET_CART_SONGS, songs });
export const clearCart = () => ({ type: CLEAR_CART });
export const setPayment = (paymentMethod) => ({ type: SET_PAYMENT, paymentMethod });
export const setEmail = (email) => ({ type: SET_EMAIL, email });

/**
 * THUNK CREATORS
 */

//Thunk creators for authenticated users
export const fetchUserCart = () => (dispatch) =>
  axios
    .get('/api/orders/cart')
    .then((res) => {
      dispatch(getCartAlbums(res.data.albums || cart.albums));
      dispatch(getCartSongs(res.data.songs || cart.songs));
    })
    .catch((err) => dispatch(setError(err)));

export const addAlbumToUserCart = (album) => (dispatch) =>
  axios
    .post(`/api/orders/cart/albums`, album)
    .then((res) => dispatch(getCartAlbums(res.data || cart.albums)))
    .catch((err) => dispatch(setError(err)));

export const addSongToUserCart = (song) => (dispatch) =>
  axios
    .post(`/api/orders/cart/songs`, song)
    .then((res) => dispatch(getCartSongs(res.data || cart.songs)))
    .catch((err) => dispatch(setError(err)));

export const removeAlbumFromUserCart = (albumId) => (dispatch) =>
  axios
    .delete(`/api/orders/cart/albums/${albumId}`)
    .then((res) => dispatch(getCartAlbums(res.data || cart.albums)))
    .catch((err) => dispatch(setError(err)));

export const removeSongFromUserCart = (songId) => (dispatch) =>
  axios
    .delete(`/api/orders/cart/songs/${songId}`)
    .then((res) => dispatch(getCartSongs(res.data || cart.songs)))
    .catch((err) => dispatch(setError(err)));

//Thunk creators for guests(unauthenticated users)
export const fetchGuestCart = () => (dispatch) =>
  axios
    .get('/api/guest/cart')
    .then((res) => {
      dispatch(getCartAlbums(res.data.albums || cart.albums));
      dispatch(getCartSongs(res.data.songs || cart.songs));
    })
    .catch((err) => dispatch(setError(err)));

export const addAlbumToGuestCart = (album) => (dispatch) =>
  axios
    .post(`/api/guest/cart/albums`, album)
    .then((res) => dispatch(getCartAlbums(res.data || cart.albums)))
    .catch((err) => dispatch(setError(err)));

export const addSongToGuestCart = (song) => (dispatch) =>
  axios
    .post(`/api/guest/cart/songs`, song)
    .then((res) => dispatch(getCartSongs(res.data || cart.songs)))
    .catch((err) => dispatch(setError(err)));

export const removeAlbumFromGuestCart = (albumId) => (dispatch) =>
  axios
    .delete(`/api/guest/cart/albums/${albumId}`)
    .then((res) => dispatch(getCartAlbums(res.data || cart.albums)))
    .catch((err) => dispatch(setError(err)));

export const removeSongFromGuestCart = (songId) => (dispatch) =>
  axios
    .delete(`/api/guest/cart/songs/${songId}`)
    .then((res) => dispatch(getCartSongs(res.data || cart.songs)))
    .catch((err) => dispatch(setError(err)));

export const updateUserCart = (props) => (dispatch) =>
  axios.put(`/api/orders/cart/`, props).then(() => dispatch(clearCart())).catch((err) => dispatch(setError(err)));

export const updateGuestCart = (props) => (dispatch) =>
  axios.put(`/api/guest/cart/`, props).then(() => dispatch(clearCart())).catch((err) => console.log(err));

/**
 * REDUCER
 */
export default function(state = cart, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case CLEAR_CART:
      return cart;
    case GET_CART_ALBUMS:
      newState.albums = action.albums;
      return newState;
    case GET_CART_SONGS:
      newState.songs = action.songs;
      return newState;
    case SET_PAYMENT:
      newState.paymentMethod = action.paymentMethod;
      return newState;
    case SET_EMAIL:
      newState.email = action.email;
      return newState;
    default:
      return state;
  }
}
