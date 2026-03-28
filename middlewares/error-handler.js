const { STATUS_CODES, MESSAGES } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR
    ? MESSAGES.INTERNAL_SERVER_ERROR
    : err.message;

  res.status(statusCode).send({ message });
  next();
};
