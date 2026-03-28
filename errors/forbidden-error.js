const AppError = require('./app-error');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');

class ForbiddenError extends AppError {
  constructor(message = MESSAGES.FORBIDDEN) {
    super(STATUS_CODES.FORBIDDEN, message);
  }
}

module.exports = ForbiddenError;
