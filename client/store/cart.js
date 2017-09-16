import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
//const GET_CART = 'GET_CART';
const GET_ALBUMS = 'GET_ALBUMS';
const GET_SONGS = 'GET_SONGS';
const ADD_ALBUMS_TO_STATE = 'ADD_ALBUMS_TO_STATE';
const ADD_SONGS_TO_STATE = 'ADD_SONGS_TO_STATE';


/**
 * INITIAL STATE
 */
const cart = { albums: [], songs: [] };

/**
 * ACTION CREATORS
 */
//export const getCart = order => ({type: GET_CART, order});
export const getAlbums = albums => ({type: GET_ALBUMS, albums});
export const getSongs = songs => ({type: GET_SONGS, songs});
export const addAlbumsToState = albums => ({type: ADD_ALBUMS_TO_STATE, albums});
export const addSongsToState = songs => ({type: ADD_SONGS_TO_STATE, songs});

/**
 * THUNK CREATORS
 */
export const fetchCart = () =>
  dispatch =>
    axios.get('/api/orders/cart')
      .then(res => {
        dispatch(getAlbums(res.data.albums || cart.albums));
        dispatch(getSongs(res.data.songs || cart.songs));
      })
      .catch(err => console.log(err));

export const addAlbumToCart = (album) =>
  dispatch =>
    axios.post(`/api/orders/cart/albums`, album)
      .then(res => dispatch(addAlbumsToState(res.data || cart.albums)))
      .catch(err => console.log(err));

export const addSongToCart = (song) =>
  dispatch =>
    axios.post(`/api/orders/cart/songs`, song)
      .then(res => dispatch(addSongsToState(res.data || cart.songs)))
      .catch(err => console.log(err));
/**
 * REDUCER
 */
export default function (state = cart, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_ALBUMS:
      newState.albums = action.albums;
      return newState;
    case GET_SONGS:
      newState.songs = action.songs;
      return newState;
    case ADD_ALBUMS_TO_STATE:
      newState.albums = [...newState.albums, action.albums];
      return newState;
    case ADD_SONGS_TO_STATE:
      newState.songs = [...newState.songs, action.songs];
      return newState;
    default:
      return state;
  }
}
