import './index.scss';
import React from 'react';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React, {exclude: /Input|Form|MenuItem|Link|Menu|Header|Icon|TransitionGroup|List|ListItem|Route|Segment|Container|Grid|Button|ButtonContent/});
}

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// establishes socket connection
import './socket';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
