import http from 'http';

import logger from '../lib/logger';

const manifest = require('../public/manifest.json');

export function error(req, res, next) {
  const err = new Error('Unexpected server error');
  err.status = 500;

  next(err);
}

export function notFound(req, res, next) {
  const notFoundError = new Error('Page not found');
  notFoundError.status = 404;

  next(notFoundError);
}

export function handleError(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || err.statusCode || 500;
  const statusDefinition = http.STATUS_CODES[status];
  const message = err.message || http.STATUS_CODES[500];
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : '';

  logger.log('error', err.stack);

  res.format({
    default: resHTML,
    html: resHTML,
    json: resJSON,
    text: resJSON
  });

  function resHTML() {
    res.status(status).render('error.ejs', {
      clientCssBundle: manifest['client.css'],
      status,
      statusDefinition,
      message,
      stack
    });
  }

  function resJSON() {
    res.status(status).json({
      errors: [{
        detail: message,
        status,
        statusDefinition,
        stack
      }]
    });
  }
}
