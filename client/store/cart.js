import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART_ALBUMS = 'GET_CART_ALBUMS';
const GET_CART_SONGS = 'GET_CART_SONGS';
const ADD_CART_ALBUMS_TO_STATE = 'ADD_CART_ALBUMS_TO_STATE';
const ADD_CART_SONGS_TO_STATE = 'ADD_CART_SONGS_TO_STATE';

/**
 * INITIAL STATE
 */
const cart = { albums: [], songs: [] };

/**
 * ACTION CREATORS
 */

export const getCartAlbums = albums => ({type: GET_CART_ALBUMS, albums});
export const getCartSongs = songs => ({type: GET_CART_SONGS, songs});
export const addCartAlbumsToState = albums => ({type: ADD_CART_ALBUMS_TO_STATE, albums});
export const addCartSongsToState = songs => ({type: ADD_CART_SONGS_TO_STATE, songs});

/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  dispatch =>
    axios.get('/api/orders/cart')
      .then(res => {
        dispatch(getCartAlbums(res.data.albums || cart.albums));
        dispatch(getCartSongs(res.data.songs || cart.songs));
      })
      .catch(err => console.log(err));

export const addAlbumToCart = (album) =>
  dispatch =>
    axios.post(`/api/orders/cart/albums`, album)
      .then(res => dispatch(addCartAlbumsToState(res.data ||      cart.albums)))
      .catch(err => console.log(err));

export const addSongToCart = (song) =>
  dispatch =>
    axios.post(`/api/orders/cart/songs`, song)
      .then(res => dispatch(addCartSongsToState(res.data || cart.songs)))
      .catch(err => console.log(err));

export const removeAlbumFromCart = (albumId) =>
  dispatch =>
    axios.delete(`/api/orders/cart/albums/${albumId}`)
      .then(res => dispatch(getCartAlbums(res.data || cart.albums)))
      .catch(err => console.log(err));

export const removeSongFromCart = (songId) =>
  dispatch =>
    axios.delete(`/api/orders/cart/songs/${songId}`)
      .then(res => dispatch(getCartSongs(res.data || cart.songs)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = cart, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_CART_ALBUMS:
      newState.albums = action.albums;
      return newState;
    case GET_CART_SONGS:
      newState.songs = action.songs;
      return newState;
    case ADD_CART_ALBUMS_TO_STATE:
      newState.albums = action.albums;
      return newState;
    case ADD_CART_SONGS_TO_STATE:
      newState.songs = action.songs;
      return newState;
    default:
      return state;
  }
}
