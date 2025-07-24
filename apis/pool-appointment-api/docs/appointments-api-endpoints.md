# Appointments API Endpoints

## Base URL

```
/api/appointments
```

## Endpoints

### 1. Criar Appointment

**POST** `/api/appointments`

**Descrição:** Cria um novo agendamento.

**Headers:**

```
Content-Type: application/json
Authorization: Bearer <access_token>
```

**Body:**

```json
{
  "userId": "string",
  "spaceId": "string",
  "date": "2024-01-15T00:00:00.000Z",
  "startTime": "2024-01-15T10:00:00.000Z",
  "endTime": "2024-01-15T12:00:00.000Z"
}
```

**Resposta de Sucesso (201):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "spaceId": "string",
    "date": "2024-01-15T00:00:00.000Z",
    "startTime": "2024-01-15T10:00:00.000Z",
    "endTime": "2024-01-15T12:00:00.000Z",
    "status": "PENDING",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 2. Buscar Appointment por ID

**GET** `/api/appointments/:id`

**Descrição:** Busca um agendamento específico por ID.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "spaceId": "string",
    "date": "2024-01-15T00:00:00.000Z",
    "startTime": "2024-01-15T10:00:00.000Z",
    "endTime": "2024-01-15T12:00:00.000Z",
    "status": "CONFIRMED",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 3. Buscar Appointments por Usuário

**GET** `/api/appointments/user/:id?page=1&perPage=10`

**Descrição:** Lista todos os agendamentos de um usuário específico.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page` (opcional): Número da página (padrão: 1)
- `perPage` (opcional): Itens por página (padrão: 10)

**Resposta de Sucesso (200):**

```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "string",
        "userId": "string",
        "spaceId": "string",
        "date": "2024-01-15T00:00:00.000Z",
        "startTime": "2024-01-15T10:00:00.000Z",
        "endTime": "2024-01-15T12:00:00.000Z",
        "status": "CONFIRMED",
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "perPage": 10,
      "total": 25,
      "totalPages": 3
    }
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 4. Buscar Appointments por Espaço

**GET** `/api/appointments/space/:id?page=1&perPage=10`

**Descrição:** Lista todos os agendamentos de um espaço específico.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page` (opcional): Número da página (padrão: 1)
- `perPage` (opcional): Itens por página (padrão: 10)

**Resposta:** Mesmo formato da busca por usuário.

### 5. Atualizar Appointment

**PUT** `/api/appointments/:id`

**Descrição:** Atualiza um agendamento existente.

**Headers:**

```
Content-Type: application/json
Authorization: Bearer <access_token>
```

**Body:**

```json
{
  "date": "2024-01-16T00:00:00.000Z",
  "startTime": "2024-01-16T14:00:00.000Z",
  "endTime": "2024-01-16T16:00:00.000Z"
}
```

**Resposta de Sucesso (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "spaceId": "string",
    "date": "2024-01-16T00:00:00.000Z",
    "startTime": "2024-01-16T14:00:00.000Z",
    "endTime": "2024-01-16T16:00:00.000Z",
    "status": "PENDING",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  },
  "metadata": {
    "timestamp": "2024-01-15T11:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 6. Deletar Appointment

**DELETE** `/api/appointments/:id`

**Descrição:** Remove um agendamento.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Resposta de Sucesso (204):**

```json
{
  "success": true,
  "data": null,
  "metadata": {
    "timestamp": "2024-01-15T11:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 7. Aprovar Appointment

**PATCH** `/api/appointments/:id/approve`

**Descrição:** Aprova um agendamento pendente (requer permissão de administrador).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Permissões Necessárias:**

- `appointment:approve`

**Resposta de Sucesso (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "spaceId": "string",
    "date": "2024-01-15T00:00:00.000Z",
    "startTime": "2024-01-15T10:00:00.000Z",
    "endTime": "2024-01-15T12:00:00.000Z",
    "status": "CONFIRMED",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  },
  "metadata": {
    "timestamp": "2024-01-15T11:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 8. Rejeitar Appointment

**PATCH** `/api/appointments/:id/reject`

**Descrição:** Rejeita um agendamento pendente (requer permissão de administrador).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Permissões Necessárias:**

- `appointment:reject`

**Resposta de Sucesso (200):**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "spaceId": "string",
    "date": "2024-01-15T00:00:00.000Z",
    "startTime": "2024-01-15T10:00:00.000Z",
    "endTime": "2024-01-15T12:00:00.000Z",
    "status": "CANCELLED",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  },
  "metadata": {
    "timestamp": "2024-01-15T11:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

## Status dos Appointments

- `PENDING`: Agendamento pendente de aprovação
- `CONFIRMED`: Agendamento aprovado
- `CANCELLED`: Agendamento cancelado/rejeitado

## Códigos de Erro

### 400 - Bad Request

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "statusCode": 400
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 401 - Unauthorized

```json
{
  "success": false,
  "error": {
    "message": "Authentication required",
    "code": "UNAUTHORIZED",
    "statusCode": 401
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 403 - Forbidden

```json
{
  "success": false,
  "error": {
    "message": "Insufficient permissions",
    "code": "FORBIDDEN",
    "statusCode": 403
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 404 - Not Found

```json
{
  "success": false,
  "error": {
    "message": "Appointment not found",
    "code": "NOT_FOUND",
    "statusCode": 404
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 409 - Conflict

```json
{
  "success": false,
  "error": {
    "message": "Já existe um agendamento para este horário neste espaço",
    "code": "INVALID_OPERATION",
    "statusCode": 400
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

### 500 - Internal Server Error

```json
{
  "success": false,
  "error": {
    "message": "Internal server error",
    "code": "INTERNAL_SERVER_ERROR",
    "statusCode": 500
  },
  "metadata": {
    "timestamp": "2024-01-15T10:00:00.000Z",
    "requestId": "string",
    "version": "1.0.0"
  }
}
```

## Validações

### Criar/Atualizar Appointment

- `userId`: Obrigatório, string válida
- `spaceId`: Obrigatório, string válida
- `date`: Obrigatório, data futura
- `startTime`: Obrigatório, horário válido
- `endTime`: Obrigatório, horário posterior ao startTime

### Aprovar/Rejeitar Appointment

- Apenas appointments com status `PENDING` podem ser aprovados/rejeitados
- Requer permissão de administrador (`appointment:approve` ou `appointment:reject`)
- Apenas usuários autenticados podem executar estas ações
