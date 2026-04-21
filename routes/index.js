const router = require('express').Router();
const authRoutes = require('./auth');
const newsRoutes = require('./news');
const userRoutes = require('./users');
const articleRoutes = require('./articles');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

router.use(authRoutes);
router.use(newsRoutes);
router.use(auth);
router.use('/users', userRoutes);
router.use('/articles', articleRoutes);
router.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
