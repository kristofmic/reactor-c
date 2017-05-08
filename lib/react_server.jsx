import Bluebird from 'bluebird';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

export default function reactRouterServer(location, routes, store) {
  return new Bluebird((resolve, reject) => {
    match({ routes, location }, handleMatch);

    function handleMatch(err, redirect, renderProps) {
      if (err) {
        return reject(err);
      }

      if (redirect) {
        const redirectPath = `${redirect.pathname}${redirect.search}`;
        return resolve({ redirectPath });
      }

      const body = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      resolve({ body });
    }
  });
}
