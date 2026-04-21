const AppError = require('../errors/app-error');
const { STATUS_CODES } = require('../utils/constants');
const { NEWS_API_KEY, NEWS_API_BASE_URL } = require('../utils/config');

const FALLBACK_NEWS_API_BASE_URL = 'https://newsapi.org/v2';

const normalizeNewsApiBaseUrl = (rawBaseUrl) => {
  const withoutTrailingSlashes = rawBaseUrl.replace(/\/+$/, '');

  if (withoutTrailingSlashes.endsWith('/everything')) {
    return withoutTrailingSlashes.replace(/\/everything$/, '');
  }

  if (withoutTrailingSlashes.endsWith('/v2')) {
    return withoutTrailingSlashes;
  }

  return `${withoutTrailingSlashes}/v2`;
};

const getNewsApiErrorMessage = async (response) => {
  const defaultMessage = `Erro da News API: ${response.status}`;

  try {
    const payload = await response.json();

    if (payload?.message) {
      return payload.message;
    }
  } catch {
    return defaultMessage;
  }

  return defaultMessage;
};

const normalizeArticle = (article, keyword) => ({
  keyword,
  title: article.title || 'Sem título',
  description: article.description || 'Sem descrição disponível.',
  publishedAt: article.publishedAt,
  source: article.source?.name || 'Fonte desconhecida',
  link: article.url,
  image: article.urlToImage || 'https://placehold.co/600x400?text=Sem+Imagem',
});

const searchNews = async (req, res, next) => {
  const {
    q,
    from,
    to,
    pageSize,
  } = req.query;

  if (!NEWS_API_KEY) {
    return next(
      new AppError(
        STATUS_CODES.SERVICE_UNAVAILABLE,
        'Serviço de notícias não configurado no servidor.',
      ),
    );
  }

  const normalizedBaseUrl = normalizeNewsApiBaseUrl(
    NEWS_API_BASE_URL || FALLBACK_NEWS_API_BASE_URL,
  );

  const query = new URLSearchParams({
    q,
    apiKey: NEWS_API_KEY,
    from,
    to,
    pageSize: String(pageSize),
  });

  try {
    const response = await fetch(
      `${normalizedBaseUrl}/everything?${query.toString()}`,
    );

    if (!response.ok) {
      const errorMessage = await getNewsApiErrorMessage(response);

      return next(new AppError(STATUS_CODES.BAD_GATEWAY, errorMessage));
    }

    const payload = await response.json();
    const articles = (payload.articles || []).map((article) => normalizeArticle(article, q));

    return res.status(STATUS_CODES.OK).send({ articles });
  } catch {
    return next(
      new AppError(
        STATUS_CODES.BAD_GATEWAY,
        'Falha ao conectar ao serviço de notícias.',
      ),
    );
  }
};

module.exports = {
  searchNews,
};
