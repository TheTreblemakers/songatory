import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALBUMS = 'GET_ALBUMS';
const GET_ALBUM = 'GET_ALBUM';
const CHANGE_ALBUM_DETAILS = 'CHANGE_ALBUM_DETAILS';

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

export const changeAlbumDetails = (prop, val) => {
  return { type: CHANGE_ALBUM_DETAILS, prop, val };
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

export const submitAlbumUpdate = (album) => (dispatch) =>
  axios
    .put(`/admin/albums/${album.id}`, album)
    .then((res) => {
      history.push(`/albums/${album.id}`);
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
    case CHANGE_ALBUM_DETAILS:
      newState.currentAlbum = Object.assign({}, state.currentAlbum, { [action.prop]: action.val });
      return newState;
    default:
      return state;
  }
}
