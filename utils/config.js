const {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URI,
  PORT,
  NEWS_API_KEY,
  NEWS_API_BASE_URL,
} = process.env;

module.exports = {
  PORT: PORT || 3000,
  MONGO_URI:
    NODE_ENV === 'production'
      ? MONGODB_URI
      : 'mongodb://127.0.0.1:27017/news-explorer-db',
  JWT_SECRET_VALUE: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  NEWS_API_KEY: NEWS_API_KEY || '',
  NEWS_API_BASE_URL: NEWS_API_BASE_URL || 'https://newsapi.org',
};
