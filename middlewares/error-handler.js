const { STATUS_CODES, MESSAGES } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR
    ? MESSAGES.INTERNAL_SERVER_ERROR
    : err.message;

  return res.status(statusCode).send({ message });
};
