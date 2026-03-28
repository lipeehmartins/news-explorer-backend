const AppError = require('./app-error');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');

class ConflictError extends AppError {
  constructor(message = MESSAGES.CONFLICT) {
    super(STATUS_CODES.CONFLICT, message);
  }
}

module.exports = ConflictError;
