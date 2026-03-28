require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors: celebrateErrors } = require('celebrate');

const routes = require('./routes');
const { requestLogger, errorLogger } = require('./utils/logger');
const { apiLimiter } = require('./utils/rate-limiter');
const errorHandler = require('./middlewares/error-handler');
const { PORT, MONGO_URI } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_URI);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(apiLimiter);

app.use('/api', routes);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

app.listen(PORT);
