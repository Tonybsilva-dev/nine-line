import {
  APPOINTMENT_PERMISSIONS,
  USER_PERMISSIONS,
  SPACE_PERMISSIONS,
  RATING_PERMISSIONS,
  RBAC_PERMISSIONS,
} from './permissions';

// Role Hierarchy Levels
export const ROLE_LEVELS = {
  USER: 0,
  MANAGER: 1,
  ADMIN: 2,
} as const;

// System Roles with predefined permissions
export const SYSTEM_ROLES = {
  USER: {
    name: 'USER',
    description: 'Regular user with basic permissions',
    level: ROLE_LEVELS.USER,
    isSystem: true,
    permissions: [
      APPOINTMENT_PERMISSIONS.CREATE,
      APPOINTMENT_PERMISSIONS.READ_OWN,
      APPOINTMENT_PERMISSIONS.UPDATE_OWN,
      APPOINTMENT_PERMISSIONS.CANCEL_OWN,
      APPOINTMENT_PERMISSIONS.RESCHEDULE,
      USER_PERMISSIONS.READ_OWN,
      USER_PERMISSIONS.UPDATE_OWN,
      SPACE_PERMISSIONS.READ,
      RATING_PERMISSIONS.CREATE,
      RATING_PERMISSIONS.READ,
      RATING_PERMISSIONS.UPDATE_OWN,
      RATING_PERMISSIONS.DELETE_OWN,
    ],
  },
  MANAGER: {
    name: 'MANAGER',
    description: 'Manager with permissions over their own spaces',
    level: ROLE_LEVELS.MANAGER,
    isSystem: true,
    permissions: [
      // All USER permissions
      APPOINTMENT_PERMISSIONS.CREATE,
      APPOINTMENT_PERMISSIONS.READ_OWN,
      APPOINTMENT_PERMISSIONS.UPDATE_OWN,
      APPOINTMENT_PERMISSIONS.DELETE_OWN,
      APPOINTMENT_PERMISSIONS.CANCEL_OWN,
      APPOINTMENT_PERMISSIONS.RESCHEDULE,
      USER_PERMISSIONS.READ_OWN,
      USER_PERMISSIONS.UPDATE_OWN,
      SPACE_PERMISSIONS.READ,
      RATING_PERMISSIONS.READ,
      // Manager-specific
      APPOINTMENT_PERMISSIONS.READ_ALL, // List all appointments of their spaces
      APPOINTMENT_PERMISSIONS.APPROVE,
      APPOINTMENT_PERMISSIONS.REJECT,
      SPACE_PERMISSIONS.UPDATE_OWN, // Only their spaces
      SPACE_PERMISSIONS.DELETE_OWN, // Only their spaces
      SPACE_PERMISSIONS.CREATE, // Can create spaces they manage
    ],
  },
  ADMIN: {
    name: 'ADMIN',
    description: 'Administrator with full permissions',
    level: ROLE_LEVELS.ADMIN,
    isSystem: true,
    permissions: [
      // All permissions
      ...Object.values(APPOINTMENT_PERMISSIONS),
      ...Object.values(USER_PERMISSIONS),
      ...Object.values(SPACE_PERMISSIONS),
      ...Object.values(RATING_PERMISSIONS),
      ...Object.values(RBAC_PERMISSIONS), // Only admin can manage roles/permissions
    ],
  },
} as const;

export type RoleName = keyof typeof SYSTEM_ROLES;
export type RoleLevel = (typeof ROLE_LEVELS)[keyof typeof ROLE_LEVELS];
