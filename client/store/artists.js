import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_ARTISTS = 'GET_ARTISTS';
const GET_ARTIST = 'GET_ARTIST';

/**
 * INITIAL STATE
 */
const initialState = {
  allArtists: [],
  currentArtist: {},
};

/**
 * ACTION CREATORS
 */
export const getArtists = (artists) => {
  return { type: GET_ARTISTS, artists };
};

export const getArtist = (artist) => {
  return { type: GET_ARTIST, artist };
};

/**
 * THUNK CREATORS
 */
export const fetchArtists = () => (dispatch) =>
  axios
    .get('/api/artists')
    .then((res) => {
      dispatch(getArtists(res.data));
    })
    .catch((err) => console.log(err));

export const fetchArtist = (id) => (dispatch) =>
  axios
    .get(`/api/artists/${id}`)
    .then((res) => {
      dispatch(getArtist(res.data));
    })
    .catch((err) => console.log(err));

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_ARTISTS:
      newState.allArtists = action.artists;
      return newState;
    case GET_ARTIST:
      newState.currentArtist = action.artist;
      return newState;
    default:
      return state;
  }
}
