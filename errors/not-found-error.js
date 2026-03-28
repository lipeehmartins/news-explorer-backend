const AppError = require('./app-error');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');

class NotFoundError extends AppError {
  constructor(message = MESSAGES.NOT_FOUND) {
    super(STATUS_CODES.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
