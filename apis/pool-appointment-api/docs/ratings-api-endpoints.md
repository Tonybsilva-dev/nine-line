# Ratings API Endpoints

## Base URL

```
/ratings
```

## Endpoints Disponíveis

### 1. Criar Avaliação

**POST** `/ratings`

**Body:**

```json
{
  "userId": "...",
  "spaceId": "...",
  "score": 5,
  "comment": "Ótimo espaço!"
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

### 2. Listar Avaliações por Usuário

**GET** `/ratings/user/:userId`

**Response:**

```json
{
  "success": true,
  "data": { "ratings": [ ... ] },
  "metadata": { ... }
}
```

---

### 3. Listar Avaliações por Espaço

**GET** `/ratings/space/:spaceId`

**Response:**

```json
{
  "success": true,
  "data": { "ratings": [ ... ] },
  "metadata": { ... }
}
```

---

### 4. Buscar Avaliação por ID

**GET** `/ratings/:id`

**Response:**

```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

---

### 5. Atualizar Avaliação

**PUT** `/ratings/:id`

**Body:**

```json
{
  "score": 4,
  "comment": "Bom, mas pode melhorar."
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

### 6. Deletar Avaliação

**DELETE** `/ratings/:id`

**Response:**

```json
{
  "success": true,
  "data": { "message": "Avaliação deletada com sucesso" },
  "metadata": { ... }
}
```

---

## Observações

- Todas as rotas exigem autenticação via Bearer Token.
- Utilize os endpoints de auth para login e obtenção de token.
