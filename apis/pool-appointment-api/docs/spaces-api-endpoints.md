# Spaces API Endpoints

## Base URL

```
/api/spaces
```

## Available Endpoints

### 1. Create Space

**POST** `/api/spaces`

**Permissions:**

- **ADMIN:** Can create a space for any host.
- **MANAGER:** Can create a space only for themselves (hostId is always their userId).
- **USER:** Cannot create spaces.

**Body:**

```json
{
  "title": "Meeting Room",
  "description": "Space for meetings",
  "photos": ["url1", "url2"],
  "rules": "No shoes",
  "amenities": ["Wi-Fi", "Coffee"]
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

### 2. List Spaces (Paginated)

**GET** `/api/spaces`

**Permissions:**

- **ADMIN:** Can list all spaces.
- **MANAGER:** Can list only spaces where they are the host.
- **USER:** Can list all spaces.

**Response:**

```json
{
  "success": true,
  "data": { "spaces": [ ... ] },
  "metadata": { ... }
}
```

---

### 3. Get Space by ID

**GET** `/api/spaces/:id`

**Permissions:**

- **ADMIN:** Can view any space.
- **MANAGER:** Can view only spaces where they are the host.
- **USER:** Can view any space.

**Response:**

```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

---

### 4. Update Space

**PUT** `/api/spaces/:id`

**Permissions:**

- **ADMIN:** Can update any space.
- **MANAGER:** Can update only spaces where they are the host.
- **USER:** Cannot update spaces.

**Body:**

```json
{
  "title": "New Title",
  "description": "New description",
  "rules": "No food",
  "amenities": ["Wi-Fi", "Water"]
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

### 5. Delete Space

**DELETE** `/api/spaces/:id`

**Permissions:**

- **ADMIN:** Can delete any space.
- **MANAGER:** Can delete only spaces where they are the host.
- **USER:** Cannot delete spaces.

**Response:**

```json
{
  "success": true,
  "data": { "message": "Space deleted successfully" },
  "metadata": { ... }
}
```

---

## Notes

- All routes require authentication via Bearer Token.
- **USER:** Can only view and list spaces.
- **MANAGER:** Can only manage (create, update, delete) spaces where they are the host.
- **ADMIN:** Has full access to all operations.
- Use the auth endpoints for login and token retrieval.
