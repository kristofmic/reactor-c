import logger from '../logger';

export function handleSuccess(res) {
  return successHandler;

  function successHandler(data) {
    res.status(200).json({ data });
  }
}

export function handleError(res) {
  return errorHandler;

  function errorHandler(err = {}) {
    logger.log('error', err.stack);

    res.status(err.statusCode || 500).json({ message: err.message });
  }
}

export default {
  handleError,
  handleSuccess
};
