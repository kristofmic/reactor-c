/* global window */

import React from 'react';
import { Router, browserHistory, hashHistory } from 'react-router';

import routes from './routes';

// Determine router history, fallback for IE9
const history = !window.history.pushState ? hashHistory : browserHistory;

const router = (
  <Router history={history}>{routes}</Router>
);

export default router;
