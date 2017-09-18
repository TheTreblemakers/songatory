import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const MAKE_QUERY = 'MAKE_QUERY';
const SET_QUERY_TYPE = 'SET_QUERY_TYPE';

/**
 * INITIAL STATE
 */
const searchState = {
  searchResults: [],
  queryType: '',
};

/**
 * ACTION CREATORS
 */
const setSearchResults = (results) => ({ type: MAKE_QUERY, results });
const setQueryType = (queryType) => ({ type: SET_QUERY_TYPE, queryType });

/**
 * THUNK CREATORS
 */

export const makeQuery = (query, queryType) => (dispatch) => {
  axios
    .post(`/api/search?type=${queryType}&val=${query}`)
    .then((res) => {
      dispatch(setSearchResults(res.data), queryType);
      dispatch(setQueryType(queryType));
      history.push('/search/results');
    })
    .catch((err) => console.error(err));
};
/**
 * REDUCER
 */
export default function(state = searchState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_QUERY_TYPE:
      newState.queryType = action.queryType;
      return newState;
    case MAKE_QUERY:
      newState.searchResults = action.results;
      return newState;
    default:
      return state;
  }
}
