import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import user from './user';
import songs from './songs';
import albums from './albums';
import artists from './artists';
import orders from './orders';
import cart from './cart';
import categories from './categories';
import search from './search';
import error from './error';


const devToolsExtension = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ ?
  window.__REDUX_DEVTOOLS_EXTENSION__() : false;

export const reducer = combineReducers({ search, user, categories, artists, albums, songs, cart, orders, error });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(
  reducer,
  devToolsExtension,
  middleware,
);

export default store;
export * from './user';
export * from './songs';
export * from './albums';
export * from './cart';
export * from './artists';
export * from './orders';
export * from './categories';
export * from './search';
export * from './error';
