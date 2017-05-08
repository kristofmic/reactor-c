export function handleSuccess(res) {
  return successHandler;

  function successHandler(data) {
    res.status(200).json({ data });
  }
}

export function handleError(next) {
  return errorHandler;

  function errorHandler(err = {}) {
    next(err);
  }
}

export default {
  handleError,
  handleSuccess
};
