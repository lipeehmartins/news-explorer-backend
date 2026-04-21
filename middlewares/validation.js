const { celebrate, Joi, Segments } = require('celebrate');

const urlRegex = /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,24})\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const objectIdRegex = /^[a-f\d]{24}$/i;
const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateArticle = celebrate({
  [Segments.BODY]: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(urlRegex),
    image: Joi.string().required().pattern(urlRegex),
  }),
});

const validateArticleId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    articleId: Joi.string().required().pattern(objectIdRegex),
  }),
});

const validateSearchNews = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    q: Joi.string().required().trim().min(1)
      .max(100),
    from: Joi.string().required().pattern(isoDateRegex),
    to: Joi.string().required().pattern(isoDateRegex),
    pageSize: Joi.number().integer().min(1)
      .max(100)
      .default(100),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateCreateArticle,
  validateArticleId,
  validateSearchNews,
};
