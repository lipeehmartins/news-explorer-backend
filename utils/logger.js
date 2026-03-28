const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'request.log'),
    }),
  ],
  format: logFormat,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}}',
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'error.log'),
    }),
  ],
  format: logFormat,
});

module.exports = { requestLogger, errorLogger };
