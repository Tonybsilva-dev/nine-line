# Authentication API Endpoints

Base URL: `/api/auth`

---

## 1. Login

**POST** `/api/auth/login`

**Body:**

```json
{
  "email": "user@email.com",
  "password": "yourpassword"
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

**POST** `/api/auth/refresh`

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

**POST** `/api/auth/logout`

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response:**

```json
{
  "message": "Logout successful"
}
```

---

## Notes

- The access token must be sent in the Authorization header for protected routes.
- After logout, the access token is blacklisted and cannot be used anymore.
- The refresh token is single-use: when refreshing, the old one is revoked and a new one is issued.
- Tokens expire: access token (15min), refresh token (7 days).
- Always use HTTPS to protect tokens.

---

## Recommended Flow

1. Login → receive access and refresh tokens.
2. Use the access token to access protected APIs.
3. When the access token expires, use the refresh token to obtain new tokens.
4. On logout, call the logout endpoint to invalidate the access token.
