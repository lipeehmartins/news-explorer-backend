const router = require('express').Router();
const { searchNews } = require('../controllers/news');
const { validateSearchNews } = require('../middlewares/validation');

router.get('/news', validateSearchNews, searchNews);

module.exports = router;
