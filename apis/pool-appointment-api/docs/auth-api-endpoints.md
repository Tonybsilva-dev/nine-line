# Endpoints de Autenticação (Auth)

Base URL: `/api/auth`

---

## 1. Login

**POST** `/login`

**Body:**

```json
{
  "email": "usuario@email.com",
  "password": "suasenha"
}
```

**Response:**

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "..."
  }
}
```

---

## 2. Refresh Token

**POST** `/refresh`

**Body:**

```json
{
  "refreshToken": "..."
}
```

**Response:**

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

## 3. Logout

**POST** `/logout`

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response:**

```json
{
  "message": "Logout realizado com sucesso"
}
```

---

## Observações

- O access token deve ser enviado no header Authorization para rotas protegidas.
- Após logout, o access token é colocado na blacklist e não pode mais ser usado.
- O refresh token é de uso único: ao fazer refresh, o antigo é revogado e um novo é emitido.
- Tokens expiram: access token (15min), refresh token (7 dias).
- Use sempre HTTPS para proteger os tokens.

---

## Fluxo recomendado

1. Login → recebe access e refresh token.
2. Usa access token para acessar APIs protegidas.
3. Quando access token expira, usa refresh token para obter novos tokens.
4. Ao sair, faz logout para invalidar o access token.
