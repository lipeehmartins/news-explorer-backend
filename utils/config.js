const {
  NODE_ENV, JWT_SECRET, MONGODB_URI, PORT,
} = process.env;

module.exports = {
  PORT: PORT || 3000,
  MONGO_URI:
    NODE_ENV === 'production'
      ? MONGODB_URI
      : 'mongodb://127.0.0.1:27017/news-explorer-db',
  JWT_SECRET_VALUE: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
