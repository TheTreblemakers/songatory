import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ALBUMS = 'GET_ALBUMS';

/**
 * INITIAL STATE
 */
const allAlbums = {};

/**
 * ACTION CREATORS
 */
const getAlbums = albums => ({type: GET_ALBUMS, albums});


/**
 * THUNK CREATORS
 */
export const fetchAlbums = () =>
  dispatch =>
    axios.get('/api/albums')
      .then(res =>
        dispatch(getAlbums(res.data || allAlbums)))
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (state = allAlbums, action) {
  switch (action.type) {
    case GET_ALBUMS:
      return action.albums;
    default:
      return state;
  }
}
