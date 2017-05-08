import express from 'express';
import conf from 'node-env-conf';

import reactServer from '../lib/react_server';
import routes from '../client/route/routes';
import { createStore } from '../client/store';

import { notFound } from './error';

const manifest = require('../public/manifest.json');

const PUBLIC_PATH = '/public';
const SERVER_RENDER = conf.get('serverRender');

const router = new express.Router();

router.use('/', defaultRoute);

function defaultRoute(req, res, next) {
  if (req.path.indexOf(PUBLIC_PATH) === 0) {
    return notFound(req, res, next);
  }

  if (SERVER_RENDER) {
    return reactServer(req.url, routes, createStore())
      .then(({ redirectPath, body }) => {
        if (redirectPath) {
          res.redirect(302, redirectPath);
        } else {
          renderDefaultRoute(res, { body });
        }
      })
      .catch(next);
  }

  renderDefaultRoute(res);
}

function renderDefaultRoute(res, locals) {
  res.status(200).render('client.ejs', Object.assign({}, locals, {
    clientCssBundle: manifest['client.css'],
    clientJsBundle: manifest['client.js'],
    vendorJsBundle: manifest['vendor.js']
  }));
}

export default router;
