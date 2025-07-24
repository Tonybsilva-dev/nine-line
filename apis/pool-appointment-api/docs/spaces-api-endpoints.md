# Spaces API Endpoints

## Base URL

```
/spaces
```

## Endpoints Disponíveis

### 1. Criar Espaço

**POST** `/spaces`

**Body:**

```json
{
  "title": "Sala de Reunião",
  "description": "Espaço para reuniões",
  "photos": ["url1", "url2"],
  "hostId": "...",
  "rules": "Sem sapatos",
  "amenities": ["Wi-Fi", "Café"]
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

### 2. Listar Espaços

**GET** `/spaces`

**Response:**

```json
{
  "success": true,
  "data": { "spaces": [ ... ] },
  "metadata": { ... }
}
```

---

### 3. Buscar Espaço por ID

**GET** `/spaces/:id`

**Response:**

```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

---

### 4. Atualizar Espaço

**PUT** `/spaces/:id`

**Body:**

```json
{
  "title": "Novo Título",
  "description": "Nova descrição",
  "rules": "Sem comida",
  "amenities": ["Wi-Fi", "Água"]
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

### 5. Deletar Espaço

**DELETE** `/spaces/:id`

**Response:**

```json
{
  "success": true,
  "data": { "message": "Espaço deletado com sucesso" },
  "metadata": { ... }
}
```

---

## Observações

- Todas as rotas exigem autenticação via Bearer Token.
- Utilize os endpoints de auth para login e obtenção de token.
