# News Explorer Backend

API do projeto Full-Stack News Explorer.

## Scripts

- `npm run start` — inicia o servidor em `localhost:3000`.
- `npm run dev` — inicia o servidor em `localhost:3000` com hot reload (`nodemon`).

## Variáveis de ambiente

Use o arquivo `.env` em produção (não versionar):

- `PORT`
- `NODE_ENV`
- `MONGODB_URI`
- `JWT_SECRET`

Modelo disponível em `.env.example`.

## Base da API

As rotas da API estão sob `/api`.

Exemplos:

- `GET /api/users/me`
- `POST /api/signup`
- `POST /api/signin`
- `GET /api/articles`
- `POST /api/articles`
- `DELETE /api/articles/:articleId`

## Deploy

Domínio HTTPS do backend (produção): `https://api.seu-dominio.com`
