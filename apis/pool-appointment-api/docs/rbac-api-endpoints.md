# RBAC API Endpoints

## Base URL

```
/api/rbac
```

## Available Endpoints

### 1. List Roles

**GET** `/api/rbac/roles`

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 10)

**Example Request:**

```
GET /api/rbac/roles?page=1&perPage=10
```

**Example Response:**

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

### 2. Assign Role

**POST** `/api/rbac/assign-role`

**Body:**

```json
{
  "userId": "user-id-here",
  "roleId": "role-id-here",
  "expiresAt": "2024-12-31T23:59:59.000Z" // optional
}
```

**Example Request:**

```json
{
  "userId": "1",
  "roleId": "3",
  "expiresAt": null
}
```

**Example Response:**

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

### 3. Revoke Role

**POST** `/api/rbac/revoke-role`

**Body:**

```json
{
  "userId": "user-id-here",
  "roleId": "role-id-here"
}
```

**Example Request:**

```json
{
  "userId": "1",
  "roleId": "3"
}
```

**Example Response:**

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

### 4. Get User Permissions

**GET** `/api/rbac/user-permissions/:userId`

**Example Request:**

```
GET /api/rbac/user-permissions/1
```

**Example Response:**

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

## Recommended Test Flow

### 1. List Available Roles

```
GET /api/rbac/roles
```

### 2. Assign ADMIN Role to a User

```json
POST /api/rbac/assign-role
{
  "userId": "1",
  "roleId": "3"
}
```

### 3. Get User Permissions

```
GET /api/rbac/user-permissions/1
```

### 4. Test Appointment Approval (if implemented)

```json
POST /api/appointments/1/approve
{
  "approvedBy": "1",
  "notes": "Approved via RBAC test"
}
```

## Permissions by Role

### USER (Level 0)

- `appointment:create`
- `appointment:read:own`
- `appointment:update:own`
- `appointment:delete:own`
- `appointment:cancel:own`

### MANAGER (Level 1)

- All USER permissions
- `appointment:read:all`
- `appointment:approve`
- `appointment:reject`

### ADMIN (Level 2)

- All MANAGER permissions
- `user:read:all`
- `user:update:all`
- `user:delete`
- `rbac:role:assign`
- `rbac:role:revoke`
- `rbac:permission:assign`
