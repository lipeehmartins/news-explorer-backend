const { celebrate, Joi, Segments } = require('celebrate');

const urlRegex = /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,24})\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const objectIdRegex = /^[a-f\d]{24}$/i;

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

module.exports = {
  validateSignup,
  validateSignin,
  validateCreateArticle,
  validateArticleId,
};
