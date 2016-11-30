import express from 'express';

const manifest = require('../public/manifest.json');

const router = new express.Router();

router.use('/', defaultRoute);

function defaultRoute(req, res) {
  res.render('client.ejs', {
    clientCssBundle: manifest['client.css'],
    clientJsBundle: manifest['client.js'],
    vendorJsBundle: manifest['vendor.js']
  });
}

export default router;
