/* global document */
/* eslint import/first: 0 */

require('es6-promise').polyfill();

import ReactDOM from 'react-dom';
import router from './route/router';

// Bind React-Router to DOM
ReactDOM.render(router, document.getElementById('entry'));
