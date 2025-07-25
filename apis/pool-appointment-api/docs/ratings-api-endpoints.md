# Ratings API Endpoints

## Base URL

```
/api/ratings
```

## Available Endpoints

### 1. Create Rating

**POST** `/api/ratings`

**Body:**

```json
{
  "userId": "...",
  "spaceId": "...",
  "score": 5,
  "comment": "Great space!"
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

### 2. List Ratings by User

**GET** `/api/ratings/user/:userId`

**Response:**

```json
{
  "success": true,
  "data": { "ratings": [ ... ] },
  "metadata": { ... }
}
```

---

### 3. List Ratings by Space

**GET** `/api/ratings/space/:spaceId`

**Response:**

```json
{
  "success": true,
  "data": { "ratings": [ ... ] },
  "metadata": { ... }
}
```

---

### 4. Get Rating by ID

**GET** `/api/ratings/:id`

**Response:**

```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

---

### 5. Update Rating

**PUT** `/api/ratings/:id`

**Body:**

```json
{
  "score": 4,
  "comment": "Good, but could be better."
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

### 6. Delete Rating

**DELETE** `/api/ratings/:id`

**Response:**

```json
{
  "success": true,
  "data": { "message": "Rating deleted successfully" },
  "metadata": { ... }
}
```

---

## Notes

- All routes require authentication via Bearer Token.
- Use the auth endpoints for login and token retrieval.
- Only the USER who created the rating can update or delete it.
