const AppError = require('./app-error');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');

class UnauthorizedError extends AppError {
  constructor(message = MESSAGES.UNAUTHORIZED) {
    super(STATUS_CODES.UNAUTHORIZED, message);
  }
}

module.exports = UnauthorizedError;
