# Business Rules

This document consolidates all business rules, permissions, and restrictions implemented and documented in the `pool-appointment-api` system.

---

## Roles & Permissions

| Role    | Level | Description                                    |
| ------- | ----- | ---------------------------------------------- |
| USER    | 0     | Regular user with basic permissions            |
| MANAGER | 1     | Manager with permissions over their own spaces |
| ADMIN   | 2     | Administrator with full permissions            |

### Main Permissions by Role

| Permission             | USER | MANAGER | ADMIN |
| ---------------------- | :--: | :-----: | :---: |
| appointment:create     |  ✔  |   ✔    |  ✔   |
| appointment:read:own   |  ✔  |   ✔    |  ✔   |
| appointment:read:all   |      |  ✔\*   |  ✔   |
| appointment:update:own |  ✔  |   ✔    |  ✔   |
| appointment:update:all |      |         |  ✔   |
| appointment:delete:own |      |   ✔    |  ✔   |
| appointment:delete:all |      |         |  ✔   |
| appointment:approve    |      |   ✔    |  ✔   |
| appointment:reject     |      |   ✔    |  ✔   |
| appointment:cancel:own |  ✔  |   ✔    |  ✔   |
| appointment:cancel:all |      |         |  ✔   |
| appointment:reschedule |  ✔  |   ✔    |  ✔   |
| user:create            |      |         |  ✔   |
| user:read:own          |  ✔  |   ✔    |  ✔   |
| user:read:all          |      |   ✔    |  ✔   |
| user:update:own        |  ✔  |   ✔    |  ✔   |
| user:update:all        |      |         |  ✔   |
| user:delete            |      |         |  ✔   |
| user:restore           |      |         |  ✔   |
| space:create           |      |   ✔    |  ✔   |
| space:read             |  ✔  |   ✔    |  ✔   |
| space:update:own       |      |   ✔    |  ✔   |
| space:update:all       |      |         |  ✔   |
| space:delete:own       |      |   ✔    |  ✔   |
| space:delete:all       |      |         |  ✔   |
| rating:create          |  ✔  |         |       |
| rating:read            |  ✔  |   ✔    |  ✔   |
| rating:update:own      |  ✔  |         |       |
| rating:delete:own      |  ✔  |         |       |
| rating:moderate        |      |         |  ✔   |
| rbac:role:assign       |      |         |  ✔   |
| rbac:role:revoke       |      |         |  ✔   |

\*MANAGER only sees appointments for spaces where they are the host.

---

## Spaces

- **USER:**
  - Can view and list all spaces.
  - Cannot create, update, or delete spaces.
- **MANAGER:**
  - Can create spaces only for themselves (hostId = their userId).
  - Can only view, list, update, and delete spaces where they are the host.
- **ADMIN:**
  - Can create, view, list, update, and delete any space.

---

## Appointments

- **USER:**
  - Can only create, view, list, update, and delete/cancel their own appointments.
  - Cancellation requires a mandatory justification.
- **MANAGER:**
  - Can only view/list/manage appointments for spaces where they are the host.
  - Can approve/reject/cancel appointments for their spaces.
- **ADMIN:**
  - Can view/list/manage any appointment.

### Status Lifecycle

| Status    | Description                     |
| --------- | ------------------------------- |
| PENDING   | Awaiting approval               |
| CONFIRMED | Approved by manager/admin       |
| CANCELLED | Cancelled by user/manager/admin |
| REJECTED  | Rejected by manager/admin       |

### Main Rules

- Cannot schedule for past dates.
- Start time must be before end time.
- Cannot schedule a space that is already booked at the same time.
- Only `PENDING` can be approved.
- Only `PENDING` or `CONFIRMED` can be rejected.
- Any change to date/time by USER resets status to `PENDING`.
- Cancellation by USER requires justification.
- Cancellation/rejection by manager/admin can have a default message.

---

## Ratings

- **USER:**
  - Can only create, update, and delete their own ratings.
- **MANAGER/ADMIN:**
  - Cannot create, update, or delete ratings (only view).
  - ADMIN can moderate ratings if necessary (`rating:moderate`).
- **Everyone can view ratings.**
- Score must be between 1 and 5.

---

## Auth

- All authenticated users can login, logout, and refresh token.
- There is no role restriction for authentication.

---

## RBAC (Role-Based Access Control)

- **ADMIN:**
  - Only one who can manage roles and permissions (`rbac:role:assign`, `rbac:role:revoke`, etc).
- **MANAGER/USER:**
  - Cannot manage roles/permissions.
- Roles are hierarchical: MANAGER inherits USER, ADMIN inherits all.
- Permissions are validated in use-cases and controllers.

---

## General Notes

- All routes require authentication via Bearer Token.
- Business rules are enforced both by permissions (SYSTEM_ROLES) and by validations in controllers/use-cases.
- The Swagger documentation for each endpoint details the permissions by role.
