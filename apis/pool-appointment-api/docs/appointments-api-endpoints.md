# Appointments API Endpoints

## Base URL

```
/api/appointments
```

## Endpoints

### 1. Create Appointment

**POST** `/api/appointments`

**Description:** Creates a new appointment.

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

**Success Response (201):**

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

---

### 2. List All Appointments (Paginated)

**GET** `/api/appointments`

**Description:** Returns a paginated list of all appointments in the system.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 10)
- `orderBy` (optional): Field to order by (default: createdAt)
- `orderDirection` (optional): asc or desc (default: desc)

**Success Response (200):**

```json
{
  "total": 25,
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
  ]
}
```

---

### 3. Get Appointment by ID

**GET** `/api/appointments/:id`

**Description:** Retrieves a specific appointment by ID.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Success Response (200):**

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

---

### 4. List Appointments by User

**GET** `/api/appointments/user/:id?page=1&perPage=10`

**Description:** Lists all appointments for a specific user.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 10)

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "appointments": [ ... ],
    "pagination": {
      "page": 1,
      "perPage": 10,
      "total": 25,
      "totalPages": 3
    }
  },
  "metadata": { ... }
}
```

---

### 5. List Appointments by Space

**GET** `/api/appointments/space/:id?page=1&perPage=10`

**Description:** Lists all appointments for a specific space.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `perPage` (optional): Items per page (default: 10)

**Response:** Same as by user.

---

### 6. Update Appointment

**PUT** `/api/appointments/:id`

**Description:** Updates an existing appointment.

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

**Success Response (200):**

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
  "metadata": { ... }
}
```

---

### 7. Delete Appointment

**DELETE** `/api/appointments/:id`

**Description:** Deletes an appointment.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Success Response (204):**

```json
{
  "success": true,
  "data": null,
  "metadata": { ... }
}
```

---

### 8. Approve Appointment

**PATCH** `/api/appointments/:id/approve`

**Description:** Approves a pending appointment (admin permission required).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Required Permissions:**

- `appointment:approve`

**Success Response (200):**

```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

---

### 9. Reject Appointment

**PATCH** `/api/appointments/:id/reject`

**Description:** Rejects a pending appointment (admin permission required).

**Headers:**

```
Authorization: Bearer <access_token>
```

**Required Permissions:**

- `appointment:reject`

**Success Response (200):**

```json
{
  "success": true,
  "data": { ... },
  "metadata": { ... }
}
```

---

## Appointment Status

- `PENDING`: Pending approval
- `CONFIRMED`: Approved
- `CANCELLED`: Cancelled/Rejected
- `REJECTED`: Rejected by manager/admin

## Error Codes

### 400 - Bad Request

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "statusCode": 400
  },
  "metadata": { ... }
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
  "metadata": { ... }
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
  "metadata": { ... }
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
  "metadata": { ... }
}
```

### 409 - Conflict

```json
{
  "success": false,
  "error": {
    "message": "There is already an appointment for this time in this space",
    "code": "INVALID_OPERATION",
    "statusCode": 400
  },
  "metadata": { ... }
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
  "metadata": { ... }
}
```

## Validations

### Create/Update Appointment

- `userId`: Required, valid string
- `spaceId`: Required, valid string
- `date`: Required, future date
- `startTime`: Required, valid time
- `endTime`: Required, time after startTime

### Approve/Reject Appointment

- Only appointments with status `PENDING` can be approved/rejected
- Requires admin permission (`appointment:approve` or `appointment:reject`)
- Only authenticated users can perform these actions
