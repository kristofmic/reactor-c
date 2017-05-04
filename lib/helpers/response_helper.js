import logger from '../logger';

export function handleSuccess(res) {
  return successHandler;

  function successHandler(data) {
    res.status(200).json({ data });
  }
}

export function handleError(next) {
  return errorHandler;

  function errorHandler(err = {}) {
    logger.log('error', err.stack);

    next(err);
  }
}

export default {
  handleError,
  handleSuccess
};
