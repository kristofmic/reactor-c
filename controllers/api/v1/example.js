import express from 'express';
import { handleSuccess, handleError } from '../../../lib/helpers/response_helper';

const router = new express.Router();

router.get('/', getExample);

function getExample(req, res) {
  if (req.query.err) {
    handleError(res)(new Error('Oops! Something went wrong :('));
  } else {
    handleSuccess(res)({ message: 'Hello world' });
  }
}

export default router;
