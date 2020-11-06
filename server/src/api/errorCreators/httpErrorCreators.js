function validationError(message) {
  const error = new Error(message);
  error.httpStatusCode = 400;
  return error;
}

function searchError(message) {
  const error = new Error(message);
  error.httpStatusCode = 404;
  return error;
}

module.exports = {
  validationError,
  searchError
}