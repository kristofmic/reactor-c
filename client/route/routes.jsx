import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import { Provider } from 'react-redux';

import store from '../store';

import App from '../components/app';
import Example from '../components/example';

const routes = (
  <Provider store={store}>
    <Route path="/" component={App}>
      <IndexRedirect to="/example" />
      <Route path="/example" component={Example} />
      <Redirect from="*" to="/example" />
    </Route>
  </Provider>
);

export default routes;
