# RBAC API Endpoints

## Base URL

```
http://localhost:3333/api/rbac
```

## Endpoints Disponíveis

### 1. Listar Roles

**GET** `/roles`

**Query Parameters:**

- `page` (opcional): Número da página (padrão: 1)
- `perPage` (opcional): Itens por página (padrão: 10)

**Exemplo de Request:**

```
GET http://localhost:3333/api/rbac/roles?page=1&perPage=10
```

**Exemplo de Response:**

```json
{
  "success": true,
  "data": {
    "roles": [
      {
        "id": "1",
        "name": "USER",
        "description": "Regular user with basic permissions",
        "level": 0,
        "isSystem": true,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "id": "2",
        "name": "MANAGER",
        "description": "Manager with approval permissions",
        "level": 1,
        "isSystem": true,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      },
      {
        "id": "3",
        "name": "ADMIN",
        "description": "Administrator with full permissions",
        "level": 2,
        "isSystem": true,
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "perPage": 10,
      "total": 3,
      "totalPages": 1
    }
  },
  "metadata": {
    "requestId": "req-123",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Atribuir Role

**POST** `/assign-role`

**Body:**

```json
{
  "userId": "user-id-here",
  "roleId": "role-id-here",
  "expiresAt": "2024-12-31T23:59:59.000Z" // opcional
}
```

**Exemplo de Request:**

```json
{
  "userId": "1",
  "roleId": "3",
  "expiresAt": null
}
```

**Exemplo de Response:**

```json
{
  "success": true,
  "data": {
    "id": "assignment-id",
    "userId": "1",
    "roleId": "3",
    "assignedBy": "system",
    "assignedAt": "2024-01-15T10:30:00.000Z",
    "expiresAt": null
  },
  "metadata": {
    "requestId": "req-123",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Revogar Role

**POST** `/revoke-role`

**Body:**

```json
{
  "userId": "user-id-here",
  "roleId": "role-id-here"
}
```

**Exemplo de Request:**

```json
{
  "userId": "1",
  "roleId": "3"
}
```

**Exemplo de Response:**

```json
{
  "success": true,
  "data": {
    "message": "Role revoked successfully",
    "userId": "1",
    "roleId": "3",
    "revokedBy": "system"
  },
  "metadata": {
    "requestId": "req-123",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Verificar Permissões do Usuário

**GET** `/user-permissions/:userId`

**Exemplo de Request:**

```
GET http://localhost:3333/api/rbac/user-permissions/1
```

**Exemplo de Response:**

```json
{
  "success": true,
  "data": {
    "userId": "1",
    "permissions": [
      "appointment:create",
      "appointment:read:own",
      "appointment:update:own",
      "appointment:delete:own",
      "appointment:approve",
      "user:read:all",
      "rbac:role:assign"
    ],
    "totalPermissions": 7
  },
  "metadata": {
    "requestId": "req-123",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## Fluxo de Teste Recomendado

### 1. Listar Roles Disponíveis

```
GET http://localhost:3333/api/rbac/roles
```

### 2. Atribuir Role ADMIN a um Usuário

```json
POST http://localhost:3333/api/rbac/assign-role
{
  "userId": "1",
  "roleId": "3"
}
```

### 3. Verificar Permissões do Usuário

```
GET http://localhost:3333/api/rbac/user-permissions/1
```

### 4. Testar Aprovação de Agendamento (se implementado)

```json
POST http://localhost:3333/api/appointments/1/approve
{
  "approvedBy": "1",
  "notes": "Approved via RBAC test"
}
```

## Permissões por Role

### USER (Level 0)

- `appointment:create`
- `appointment:read:own`
- `appointment:update:own`
- `appointment:delete:own`
- `appointment:cancel:own`

### MANAGER (Level 1)

- Todas as permissões do USER
- `appointment:read:all`
- `appointment:approve`
- `appointment:reject`

### ADMIN (Level 2)

- Todas as permissões do MANAGER
- `user:read:all`
- `user:update:all`
- `user:delete`
- `rbac:role:assign`
- `rbac:role:revoke`
- `rbac:permission:assign`
