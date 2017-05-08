/* global document */
/* eslint import/first: 0 */

require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import router from './route/router';
import store from './store';

if (process.env.BROWSER) {
  require('./styles/index.scss');
}

const entry = (
  <Provider store={store}>
    {router}
  </Provider>
);

// Bind app to the DOM
ReactDOM.render(entry, document.getElementById('entry'));
