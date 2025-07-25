# RBAC Module (Role-Based Access Control)

## Overview

The RBAC module implements a complete role-based access control system, following the strict pattern of the users module. The system allows role hierarchy, granular permissions, cache for performance, and complete auditing.

## Structure

```
src/modules/rbac/
├── domain/
│   ├── entities/
│   │   ├── permission.ts          # Permission entity
│   │   ├── role.ts               # Role entity with hierarchy
│   │   ├── user-role-assignment.ts # User-role association
│   │   ├── permissions.ts        # Permission constants
│   │   └── roles.ts              # Role constants
│   ├── events/
│   │   ├── role-assigned.event.ts
│   │   ├── role-revoked.event.ts
│   │   ├── role-created.event.ts
│   │   └── index.ts
│   ├── repositories/
│   │   ├── permission-repository.ts
│   │   ├── role-repository.ts
│   │   └── user-role-repository.ts
│   └── services/
│       └── authorization.service.ts # Main service with cache
├── application/
│   ├── events/
│   │   ├── role-assigned.handler.ts
│   │   ├── role-revoked.handler.ts
│   │   ├── role-created.handler.ts
│   │   └── index.ts
│   └── use-cases/
│       ├── assign-role/
│       ├── revoke-role/
│       ├── create-role/
│       ├── check-permission/
│       └── get-user-permissions/
└── presentation/
    └── middleware/
        └── authorization.middleware.ts
```

## Role Hierarchy

```typescript
ROLE_LEVELS = {
  USER: 0, // Basic user
  MANAGER: 1, // Manager with elevated permissions
  ADMIN: 2, // Administrator with all permissions
};
```

## Granular Permissions

### Appointments

- `appointment:create` - Create appointment
- `appointment:read:own` - Read own appointments
- `appointment:read:all` - Read all appointments
- `appointment:update:own` - Update own appointments
- `appointment:update:all` - Update all appointments
- `appointment:delete:own` - Delete own appointments
- `appointment:delete:all` - Delete all appointments
- `appointment:approve` - Approve appointments
- `appointment:reject` - Reject appointments
- `appointment:cancel:own` - Cancel own appointments
- `appointment:cancel:all` - Cancel all appointments

### Users

- `user:create` - Create user
- `user:read:own` - Read own profile
- `user:read:all` - Read all users
- `user:update:own` - Update own profile
- `user:update:all` - Update all users
- `user:delete` - Delete users
- `user:block` - Block users
- `user:unblock` - Unblock users

### Spaces

- `space:create` - Create space
- `space:read` - Read spaces
- `space:update:own` - Update own spaces
- `space:update:all` - Update all spaces
- `space:delete:own` - Delete own spaces
- `space:delete:all` - Delete all spaces

### Ratings

- `rating:create` - Create rating
- `rating:read` - Read ratings
- `rating:update:own` - Update own ratings
- `rating:update:all` - Update all ratings
- `rating:delete:own` - Delete own ratings
- `rating:delete:all` - Delete all ratings

## Predefined Roles

### USER (Level 0)

- Basic permissions to create and manage own appointments
- Read access to spaces
- Ability to create and manage own ratings

### MANAGER (Level 1)

- All USER permissions
- Ability to approve/reject appointments
- Read access to all users
- Ability to manage all ratings

### ADMIN (Level 2)

- All system permissions
- Total control over roles and permissions
- Ability to manage all resources

## Performance Cache

The `AuthorizationService` implements permission cache with 5-minute TTL for performance optimization:

```typescript
interface PermissionCache {
  [userId: string]: {
    permissions: string[];
    expiresAt: number;
  };
}
```

## Auditing

All events are recorded with complete information:

- Who assigned/removed the role
- When the action was performed
- Which role was affected
- Role expiration (if applicable)

## Integration with Appointments

Example usage in the appointments module:

```typescript
export class ApproveAppointmentUseCase {
  async execute(data: ApproveAppointmentDTO): Promise<Appointment> {
    // Check approval permission
    await this.authorizationService.requirePermission(
      data.adminId,
      APPOINTMENT_PERMISSIONS.APPROVE,
    );

    // Approval logic...
  }
}
```

## Authorization Middleware

```typescript
// Check specific permission
app.get('/appointments', requirePermission('appointment:read:all'));

// Check role level
app.post('/admin/users', requireRoleLevel(2)); // ADMIN only

// Check resource ownership
app.put('/appointments/:id', requireResourceOwnership('appointment', 'id'));
```

## Domain Events

- `RoleAssignedEvent` - When a role is assigned
- `RoleRevokedEvent` - When a role is revoked
- `RoleCreatedEvent` - When a new role is created

## Benefits

1. **Security**: Granular access control
2. **Performance**: Permission cache
3. **Auditing**: Complete action tracking
4. **Flexibility**: Role hierarchy
5. **Extensibility**: Event system
6. **Maintainability**: Consistent pattern with other modules
