import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';

/**
 * INITIAL STATE
 */
const initialState = {
  allCategories: [],
  currentCategory: {},
};

/**
 * ACTION CREATORS
 */
export const getCategories = (categories) => {
  return { type: GET_CATEGORIES, categories };
};

export const getCategory = (category) => {
  return { type: GET_CATEGORY, category };
};

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => (dispatch) =>
  axios
    .get('/api/categories')
    .then((res) => {
      dispatch(getCategories(res.data));
    })
    .catch((err) => console.log(err));

export const fetchCategory = (id) => (dispatch) =>
  axios
    .get(`/api/categories/${id}`)
    .then((res) => {
      dispatch(getCategory(res.data));
    })
    .catch((err) => console.log(err));

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_CATEGORIES:
      newState.allCategories = action.categories;
      return newState;
    case GET_CATEGORY:
      newState.currentCategory = action.category;
      return newState;
    default:
      return state;
  }
}
