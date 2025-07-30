import { Role } from '../entities/role';
import { UserRoleAssignment } from '../entities';
import { RoleRepository } from '../repositories/role.repository';
import { UserRoleRepository } from '../repositories/user-role.repository';
import { EntityNotFoundError, UnauthorizedError } from '@/core/errors';

interface PermissionCache {
  [userId: string]: {
    permissions: string[];
    expiresAt: number;
  };
}

export class AuthorizationService {
  private permissionCache: PermissionCache = {};
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async hasPermission(userId: string, permission: string): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId);
    return userPermissions.includes(permission);
  }

  async canAccessResource(
    userId: string,
    resource: string,
    action: string,
  ): Promise<boolean> {
    const permission = `${resource}:${action}`;
    return this.hasPermission(userId, permission);
  }

  async requirePermission(userId: string, permission: string): Promise<void> {
    const hasPermission = await this.hasPermission(userId, permission);

    if (!hasPermission) {
      throw new UnauthorizedError(
        `User does not have permission: ${permission}`,
      );
    }
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    // Check cache first
    const cached = this.permissionCache[userId];
    if (cached && Date.now() < cached.expiresAt) {
      return cached.permissions;
    }

    // Get user's active role assignments
    const userRoles = await this.userRoleRepository.findActiveByUserId(userId);

    if (userRoles.length === 0) {
      return [];
    }

    // Get all roles with their permissions
    const roleIds = userRoles.map((ur) => ur.roleId);
    const roles = await Promise.all(
      roleIds.map((id) => this.roleRepository.findById(id)),
    );

    // Collect all permissions from all roles
    const permissions = new Set<string>();

    for (const role of roles) {
      if (role) {
        for (const permission of role.permissions) {
          permissions.add(permission.name);
        }
      }
    }

    const permissionList = Array.from(permissions);

    // Cache the result
    this.permissionCache[userId] = {
      permissions: permissionList,
      expiresAt: Date.now() + this.CACHE_TTL,
    };

    return permissionList;
  }

  async getUserRoles(userId: string): Promise<Role[]> {
    const userRoles = await this.userRoleRepository.findActiveByUserId(userId);

    if (userRoles.length === 0) {
      return [];
    }

    const roleIds = userRoles.map((ur) => ur.roleId);
    const roles = await Promise.all(
      roleIds.map((id) => this.roleRepository.findById(id)),
    );

    return roles.filter((role): role is Role => role !== null);
  }

  async assignRoleToUser(
    userId: string,
    roleId: string,
    assignedBy: string,
    expiresAt?: Date,
  ): Promise<UserRoleAssignment> {
    // Verify role exists
    const role = await this.roleRepository.findById(roleId);
    if (!role) {
      throw new EntityNotFoundError('Role', roleId);
    }

    // Check if assignment already exists
    const existingAssignments =
      await this.userRoleRepository.findByUserId(userId);
    const existingAssignment = existingAssignments.find(
      (ur) => ur.roleId === roleId,
    );

    if (existingAssignment) {
      throw new Error('User already has this role assigned');
    }

    const userRole = UserRoleAssignment.create({
      userId,
      roleId,
      assignedBy,
      expiresAt,
    });

    await this.userRoleRepository.create(userRole);

    // Clear cache for this user
    delete this.permissionCache[userId];

    return userRole;
  }

  async revokeRoleFromUser(userId: string, roleId: string): Promise<void> {
    await this.userRoleRepository.deleteByUserIdAndRoleId(userId, roleId);

    // Clear cache for this user
    delete this.permissionCache[userId];
  }

  async clearCache(userId?: string): Promise<void> {
    if (userId) {
      delete this.permissionCache[userId];
    } else {
      this.permissionCache = {};
    }
  }

  async checkRoleHierarchy(
    userRoleLevel: number,
    requiredRoleLevel: number,
  ): Promise<boolean> {
    return userRoleLevel >= requiredRoleLevel;
  }

  async requireRoleLevel(userId: string, requiredLevel: number): Promise<void> {
    const userRoles = await this.getUserRoles(userId);

    if (userRoles.length === 0) {
      throw new UnauthorizedError('User has no roles assigned');
    }

    const maxUserLevel = Math.max(...userRoles.map((r) => r.level));

    if (maxUserLevel < requiredLevel) {
      throw new UnauthorizedError(
        `User role level ${maxUserLevel} is insufficient. Required: ${requiredLevel}`,
      );
    }
  }
}
