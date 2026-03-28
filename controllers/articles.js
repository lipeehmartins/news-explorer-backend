const Article = require('../models/article');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const { STATUS_CODES, MESSAGES } = require('../utils/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(STATUS_CODES.CREATED).send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError());
      }

      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .orFail(() => new NotFoundError(MESSAGES.ARTICLE_NOT_FOUND))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MESSAGES.ARTICLE_FORBIDDEN);
      }

      return Article.findByIdAndDelete(articleId).then(() => {
        res.send(article);
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError());
      }

      return next(err);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
