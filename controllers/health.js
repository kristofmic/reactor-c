import express from 'express';
import conf from 'node-env-conf';

const router = new express.Router();

router.get('/', getHealth);

function getHealth(req, res) {
  res.status(200).json({ message: conf.get('health') });
}

export default router;
