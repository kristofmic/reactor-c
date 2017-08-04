import express from 'express';
import conf from 'node-env-conf';

const HEALTH_MESSAGE = conf.get('health');

const router = new express.Router();

router.get('/', getHealth);

function getHealth(req, res) {
  res.status(200).json({
    message: HEALTH_MESSAGE,
  });
}

export default router;
