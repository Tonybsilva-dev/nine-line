import { prisma } from '@/config/prisma';
import {
  APPOINTMENT_PERMISSIONS,
  USER_PERMISSIONS,
  SPACE_PERMISSIONS,
  RATING_PERMISSIONS,
  RBAC_PERMISSIONS,
} from '../../domain/entities/permissions';
import { SYSTEM_ROLES } from '../../domain/entities/roles';

export class RBACSeeder {
  static async seed(): Promise<void> {
    // 1. Criar permissões
    await this.createPermissions();

    // 2. Criar roles do sistema
    await this.createSystemRoles();
  }

  private static async createPermissions(): Promise<void> {
    const allPermissions = [
      // Appointments
      {
        name: APPOINTMENT_PERMISSIONS.CREATE,
        description: 'Create appointments',
        resource: 'appointment',
        action: 'create',
      },
      {
        name: APPOINTMENT_PERMISSIONS.READ_OWN,
        description: 'Read own appointments',
        resource: 'appointment',
        action: 'read:own',
      },
      {
        name: APPOINTMENT_PERMISSIONS.READ_ALL,
        description: 'Read all appointments',
        resource: 'appointment',
        action: 'read:all',
      },
      {
        name: APPOINTMENT_PERMISSIONS.UPDATE_OWN,
        description: 'Update own appointments',
        resource: 'appointment',
        action: 'update:own',
      },
      {
        name: APPOINTMENT_PERMISSIONS.UPDATE_ALL,
        description: 'Update all appointments',
        resource: 'appointment',
        action: 'update:all',
      },
      {
        name: APPOINTMENT_PERMISSIONS.DELETE_OWN,
        description: 'Delete own appointments',
        resource: 'appointment',
        action: 'delete:own',
      },
      {
        name: APPOINTMENT_PERMISSIONS.DELETE_ALL,
        description: 'Delete all appointments',
        resource: 'appointment',
        action: 'delete:all',
      },
      {
        name: APPOINTMENT_PERMISSIONS.APPROVE,
        description: 'Approve appointments',
        resource: 'appointment',
        action: 'approve',
      },
      {
        name: APPOINTMENT_PERMISSIONS.REJECT,
        description: 'Reject appointments',
        resource: 'appointment',
        action: 'reject',
      },
      {
        name: APPOINTMENT_PERMISSIONS.CANCEL_OWN,
        description: 'Cancel own appointments',
        resource: 'appointment',
        action: 'cancel:own',
      },
      {
        name: APPOINTMENT_PERMISSIONS.CANCEL_ALL,
        description: 'Cancel all appointments',
        resource: 'appointment',
        action: 'cancel:all',
      },

      // Users
      {
        name: USER_PERMISSIONS.CREATE,
        description: 'Create users',
        resource: 'user',
        action: 'create',
      },
      {
        name: USER_PERMISSIONS.READ_OWN,
        description: 'Read own profile',
        resource: 'user',
        action: 'read:own',
      },
      {
        name: USER_PERMISSIONS.READ_ALL,
        description: 'Read all users',
        resource: 'user',
        action: 'read:all',
      },
      {
        name: USER_PERMISSIONS.UPDATE_OWN,
        description: 'Update own profile',
        resource: 'user',
        action: 'update:own',
      },
      {
        name: USER_PERMISSIONS.UPDATE_ALL,
        description: 'Update all users',
        resource: 'user',
        action: 'update:all',
      },
      {
        name: USER_PERMISSIONS.DELETE,
        description: 'Delete users',
        resource: 'user',
        action: 'delete',
      },
      {
        name: USER_PERMISSIONS.BLOCK,
        description: 'Block users',
        resource: 'user',
        action: 'block',
      },
      {
        name: USER_PERMISSIONS.UNBLOCK,
        description: 'Unblock users',
        resource: 'user',
        action: 'unblock',
      },

      // Spaces
      {
        name: SPACE_PERMISSIONS.CREATE,
        description: 'Create spaces',
        resource: 'space',
        action: 'create',
      },
      {
        name: SPACE_PERMISSIONS.READ,
        description: 'Read spaces',
        resource: 'space',
        action: 'read',
      },
      {
        name: SPACE_PERMISSIONS.UPDATE_OWN,
        description: 'Update own spaces',
        resource: 'space',
        action: 'update:own',
      },
      {
        name: SPACE_PERMISSIONS.UPDATE_ALL,
        description: 'Update all spaces',
        resource: 'space',
        action: 'update:all',
      },
      {
        name: SPACE_PERMISSIONS.DELETE_OWN,
        description: 'Delete own spaces',
        resource: 'space',
        action: 'delete:own',
      },
      {
        name: SPACE_PERMISSIONS.DELETE_ALL,
        description: 'Delete all spaces',
        resource: 'space',
        action: 'delete:all',
      },

      // Ratings
      {
        name: RATING_PERMISSIONS.CREATE,
        description: 'Create ratings',
        resource: 'rating',
        action: 'create',
      },
      {
        name: RATING_PERMISSIONS.READ,
        description: 'Read ratings',
        resource: 'rating',
        action: 'read',
      },
      {
        name: RATING_PERMISSIONS.UPDATE_OWN,
        description: 'Update own ratings',
        resource: 'rating',
        action: 'update:own',
      },
      {
        name: RATING_PERMISSIONS.UPDATE_ALL,
        description: 'Update all ratings',
        resource: 'rating',
        action: 'update:all',
      },
      {
        name: RATING_PERMISSIONS.DELETE_OWN,
        description: 'Delete own ratings',
        resource: 'rating',
        action: 'delete:own',
      },
      {
        name: RATING_PERMISSIONS.DELETE_ALL,
        description: 'Delete all ratings',
        resource: 'rating',
        action: 'delete:all',
      },

      // RBAC
      {
        name: RBAC_PERMISSIONS.ROLE_ASSIGN,
        description: 'Assign roles',
        resource: 'rbac',
        action: 'role:assign',
      },
      {
        name: RBAC_PERMISSIONS.ROLE_REVOKE,
        description: 'Revoke roles',
        resource: 'rbac',
        action: 'role:revoke',
      },
      {
        name: RBAC_PERMISSIONS.ROLE_CREATE,
        description: 'Create roles',
        resource: 'rbac',
        action: 'role:create',
      },
      {
        name: RBAC_PERMISSIONS.ROLE_UPDATE,
        description: 'Update roles',
        resource: 'rbac',
        action: 'role:update',
      },
      {
        name: RBAC_PERMISSIONS.ROLE_DELETE,
        description: 'Delete roles',
        resource: 'rbac',
        action: 'role:delete',
      },
      {
        name: RBAC_PERMISSIONS.PERMISSION_ASSIGN,
        description: 'Assign permissions',
        resource: 'rbac',
        action: 'permission:assign',
      },
      {
        name: RBAC_PERMISSIONS.PERMISSION_REVOKE,
        description: 'Revoke permissions',
        resource: 'rbac',
        action: 'permission:revoke',
      },
      {
        name: RBAC_PERMISSIONS.PERMISSION_CREATE,
        description: 'Create permissions',
        resource: 'rbac',
        action: 'permission:create',
      },
      {
        name: RBAC_PERMISSIONS.PERMISSION_UPDATE,
        description: 'Update permissions',
        resource: 'rbac',
        action: 'permission:update',
      },
      {
        name: RBAC_PERMISSIONS.PERMISSION_DELETE,
        description: 'Delete permissions',
        resource: 'rbac',
        action: 'permission:delete',
      },
    ];

    for (const permission of allPermissions) {
      await prisma.permission.upsert({
        where: { name: permission.name },
        update: {},
        create: {
          name: permission.name,
          description: permission.description,
          resource: permission.resource,
          action: permission.action,
        },
      });
    }
  }

  private static async createSystemRoles(): Promise<void> {
    const roles = [
      {
        name: SYSTEM_ROLES.USER.name,
        description: SYSTEM_ROLES.USER.description,
        level: SYSTEM_ROLES.USER.level,
        isSystem: SYSTEM_ROLES.USER.isSystem,
        permissions: SYSTEM_ROLES.USER.permissions,
      },
      {
        name: SYSTEM_ROLES.MANAGER.name,
        description: SYSTEM_ROLES.MANAGER.description,
        level: SYSTEM_ROLES.MANAGER.level,
        isSystem: SYSTEM_ROLES.MANAGER.isSystem,
        permissions: SYSTEM_ROLES.MANAGER.permissions,
      },
      {
        name: SYSTEM_ROLES.ADMIN.name,
        description: SYSTEM_ROLES.ADMIN.description,
        level: SYSTEM_ROLES.ADMIN.level,
        isSystem: SYSTEM_ROLES.ADMIN.isSystem,
        permissions: SYSTEM_ROLES.ADMIN.permissions,
      },
    ];

    for (const roleData of roles) {
      // Criar role
      const role = await prisma.role.upsert({
        where: { name: roleData.name },
        update: {},
        create: {
          name: roleData.name,
          description: roleData.description,
          level: roleData.level,
          isSystem: roleData.isSystem,
        },
      });

      // Associar permissões
      for (const permissionName of roleData.permissions) {
        const permission = await prisma.permission.findUnique({
          where: { name: permissionName },
        });

        if (permission) {
          await prisma.rolePermission.upsert({
            where: {
              roleId_permissionId: {
                roleId: role.id,
                permissionId: permission.id,
              },
            },
            update: {},
            create: {
              roleId: role.id,
              permissionId: permission.id,
            },
          });
        }
      }
    }
  }
}

RBACSeeder.seed()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('Erro ao rodar o RBAC seeder:', err);
    process.exit(1);
  });
