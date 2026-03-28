module.exports = {
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
  MESSAGES: {
    BAD_REQUEST: 'Dados inválidos enviados',
    UNAUTHORIZED: 'Autorização necessária',
    FORBIDDEN: 'Acesso negado',
    NOT_FOUND: 'Recurso não encontrado',
    CONFLICT: 'Conflito de dados',
    INTERNAL_SERVER_ERROR: 'Erro interno do servidor',
    INVALID_CREDENTIALS: 'E-mail ou senha incorretos',
    USER_NOT_FOUND: 'Usuário não encontrado',
    ARTICLE_NOT_FOUND: 'Artigo não encontrado',
    ARTICLE_FORBIDDEN: 'Você não pode excluir artigos de outros usuários',
  },
};
