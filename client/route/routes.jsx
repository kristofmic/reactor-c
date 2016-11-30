import React from 'react';
import { Route, IndexRedirect, Redirect } from 'react-router';

import App from '../components/app';
import Example from '../components/example';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="/example" />
    <Route path="/example" component={Example} />
    <Redirect from="*" to="/example" />
  </Route>
);

export default routes;
