// Appointments Permissions
export const APPOINTMENT_PERMISSIONS = {
  CREATE: 'appointment:create',
  READ_OWN: 'appointment:read:own',
  READ_ALL: 'appointment:read:all',
  UPDATE_OWN: 'appointment:update:own',
  UPDATE_ALL: 'appointment:update:all',
  DELETE_OWN: 'appointment:delete:own',
  DELETE_ALL: 'appointment:delete:all',
  APPROVE: 'appointment:approve',
  REJECT: 'appointment:reject',
  CANCEL_OWN: 'appointment:cancel:own',
  CANCEL_ALL: 'appointment:cancel:all',
} as const;

// Users Permissions
export const USER_PERMISSIONS = {
  CREATE: 'user:create',
  READ_OWN: 'user:read:own',
  READ_ALL: 'user:read:all',
  UPDATE_OWN: 'user:update:own',
  UPDATE_ALL: 'user:update:all',
  DELETE: 'user:delete',
  BLOCK: 'user:block',
  UNBLOCK: 'user:unblock',
} as const;

// Spaces Permissions
export const SPACE_PERMISSIONS = {
  CREATE: 'space:create',
  READ: 'space:read',
  UPDATE_OWN: 'space:update:own',
  UPDATE_ALL: 'space:update:all',
  DELETE_OWN: 'space:delete:own',
  DELETE_ALL: 'space:delete:all',
} as const;

// Ratings Permissions
export const RATING_PERMISSIONS = {
  CREATE: 'rating:create',
  READ: 'rating:read',
  UPDATE_OWN: 'rating:update:own',
  UPDATE_ALL: 'rating:update:all',
  DELETE_OWN: 'rating:delete:own',
  DELETE_ALL: 'rating:delete:all',
} as const;

// RBAC Permissions
export const RBAC_PERMISSIONS = {
  ROLE_ASSIGN: 'rbac:role:assign',
  ROLE_REVOKE: 'rbac:role:revoke',
  ROLE_CREATE: 'rbac:role:create',
  ROLE_UPDATE: 'rbac:role:update',
  ROLE_DELETE: 'rbac:role:delete',
  PERMISSION_ASSIGN: 'rbac:permission:assign',
  PERMISSION_REVOKE: 'rbac:permission:revoke',
  PERMISSION_CREATE: 'rbac:permission:create',
  PERMISSION_UPDATE: 'rbac:permission:update',
  PERMISSION_DELETE: 'rbac:permission:delete',
} as const;

// All Permissions
export const ALL_PERMISSIONS = {
  ...APPOINTMENT_PERMISSIONS,
  ...USER_PERMISSIONS,
  ...SPACE_PERMISSIONS,
  ...RATING_PERMISSIONS,
  ...RBAC_PERMISSIONS,
} as const;

export type PermissionName =
  (typeof ALL_PERMISSIONS)[keyof typeof ALL_PERMISSIONS];
