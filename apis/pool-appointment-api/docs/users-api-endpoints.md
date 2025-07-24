# Users API Endpoints

## Base URL

```
/users
```

## Endpoints Disponíveis

### 1. Criar Usuário

**POST** `/users`

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "senha123",
  "status": "ACTIVE",
  "role": "USER"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "ACTIVE",
    "role": "USER"
  },
  "metadata": { ... }
}
```

---

### 2. Listar Usuários

**GET** `/users`

**Query Parameters:**

- `page` (opcional): Número da página
- `perPage` (opcional): Itens por página

**Response:**

```json
{
  "success": true,
  "data": {
    "users": [ ... ],
    "pagination": { ... }
  },
  "metadata": { ... }
}
```

---

### 3. Buscar Usuário por ID

**GET** `/users/:id`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "status": "...",
    "role": "..."
  },
  "metadata": { ... }
}
```

---

### 4. Atualizar Usuário

**PUT** `/users/:id`

**Body:**

```json
{
  "name": "Novo Nome",
  "email": "novo@email.com",
  "status": "ACTIVE",
  "role": "USER"
}
```

**Response:**

```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

---

### 5. Deletar Usuário

**DELETE** `/users/:id`

**Response:**

```json
{
  "success": true,
  "data": { "message": "Usuário deletado com sucesso" },
  "metadata": { ... }
}
```

---

## Observações

- Apenas a rota de criação de usuário é pública.
- Todas as outras rotas exigem autenticação via Bearer Token.
- Utilize os endpoints de auth para login e obtenção de token.
