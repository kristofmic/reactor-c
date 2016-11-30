import logger from '../logger';

export function handleRequest(resolve, reject) {
  return requestHandler;

  function requestHandler(error, httpRes, body) {
    if (error) {
      logger.log('error', error.stack);
      return reject(error);
    }

    if (!httpRes) {
      const unexpectedError = new Error('Unexpected request error - no response provided');
      unexpectedError.statusCode = 500;
      logger.log('error', unexpectedError.stack);
      return reject(unexpectedError);
    }

    if (httpRes.statusCode >= 400) {
      const statusError = new Error(httpRes.statusMessage || 'Error making request to datadog');
      statusError.statusCode = httpRes.statusCode;
      logger.log('error', statusError.stack);
      return reject(statusError);
    }

    return resolve(body);
  }
}

export default {
  handleRequest
};
