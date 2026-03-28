const AppError = require('./app-error');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');

class BadRequestError extends AppError {
  constructor(message = MESSAGES.BAD_REQUEST) {
    super(STATUS_CODES.BAD_REQUEST, message);
  }
}

module.exports = BadRequestError;
