/* global window */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';

import routes from './routes';

import store from '../store';

// Determine router history, fallback for IE9
const history = !window.history.pushState ? hashHistory : browserHistory;

const router = (
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>
);

export default router;
