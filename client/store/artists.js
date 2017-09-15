import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ARTISTS = 'GET_ARTISTS';

/**
 * INITIAL STATE
 */
const allArtists = [];

/**
 * ACTION CREATORS
 */
export const getArtists = (artists) => ({ type: GET_ARTISTS, artists });

/**
 * THUNK CREATORS
 */
export const fetchArtists = () => (dispatch) =>
  axios
    .get('/api/artists')
    .then((res) => {
      dispatch(getArtists(res.data || allArtists));
    })
    .catch((err) => console.log(err));

/**
 * REDUCER
 */
export default function(state = allArtists, action) {
  switch (action.type) {
    case GET_ARTISTS:
      return action.artists;
    default:
      return state;
  }
}
