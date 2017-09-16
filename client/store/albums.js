import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALBUMS = 'GET_ALBUMS';
const GET_ALBUM = 'GET_ALBUM';

/**
 * INITIAL STATE
 */
const initialState = {
  allAlbums: [],
  currentAlbum: {},
};

/**
 * ACTION CREATORS
 */
export const getAlbums = (albums) => {
  return { type: GET_ALBUMS, albums };
};

export const getAlbum = (album) => {
  return { type: GET_ALBUM, album };
};

/**
 * THUNK CREATORS
 */
export const fetchAlbums = () => (dispatch) =>
  axios
    .get('/api/albums')
    .then((res) => {
      dispatch(getAlbums(res.data));
    })
    .catch((err) => console.log(err));

export const fetchAlbum = (id) => (dispatch) =>
  axios
    .get(`/api/albums/${id}`)
    .then((res) => {
      dispatch(getAlbum(res.data));
    })
    .catch((err) => console.log(err));

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_ALBUMS:
      newState.allAlbums = action.albums;
      return newState;
    case GET_ALBUM:
      newState.currentAlbum = action.album;
      return newState;
    default:
      return state;
  }
}
