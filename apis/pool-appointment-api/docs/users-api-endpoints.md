# Users API Endpoints

## Base URL

```
/api/users
```

## Available Endpoints

### 1. Create User

**POST** `/api/users`

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
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

### 2. List Users (Paginated)

**GET** `/api/users`

**Query Parameters:**

- `page` (optional): Page number
- `perPage` (optional): Items per page

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

### 3. Get User by ID

**GET** `/api/users/:id`

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

### 4. Update User

**PUT** `/api/users/:id`

**Body:**

```json
{
  "name": "New Name",
  "email": "new@email.com",
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

### 5. Delete User

**DELETE** `/api/users/:id`

**Response:**

```json
{
  "success": true,
  "data": { "message": "User deleted successfully" },
  "metadata": { ... }
}
```

---

## Notes

- Only the user creation route is public.
- All other routes require authentication via Bearer Token.
- Use the auth endpoints for login and token retrieval.
