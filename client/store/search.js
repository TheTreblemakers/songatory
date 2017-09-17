import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const MAKE_QUERY = 'MAKE_QUERY';

/**
 * INITIAL STATE
 */
const searchResults = [];

/**
 * ACTION CREATORS
 */
const setSearchResults = (results) => ({ type: MAKE_QUERY, results });

/**
 * THUNK CREATORS
 */

export const makeQuery = (query, queryType) => (dispatch) => {
  axios
    .post(`/api/search?type=${queryType}&val=${query}`)
    .then((res) => {
      dispatch(setSearchResults(res.data));
      history.push('/search/results');
    })
    .catch((err) => console.error(err));
};
/**
 * REDUCER
 */
export default function(state = searchResults, action) {
  switch (action.type) {
    case MAKE_QUERY:
      return action.results;
    default:
      return state;
  }
}
