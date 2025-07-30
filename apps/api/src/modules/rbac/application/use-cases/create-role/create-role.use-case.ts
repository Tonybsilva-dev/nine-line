import { RoleRepository } from '../../../domain/repositories/role.repository';
import { PermissionRepository } from '../../../domain/repositories/permission.repository';
import { Role } from '../../../domain/entities/role';
import { Permission } from '../../../domain/entities/permission';
import { EventBus } from '@/core/events';
import { RoleCreatedEvent } from '../../../domain/events';
import { DuplicateEntityError } from '@/core/errors';
import { SYSTEM_ROLES } from '../../../domain/entities/roles';

interface CreateRoleDTO {
  name: string;
  description: string;
  level: number;
  isSystem?: boolean;
  permissionIds?: string[];
  createdBy?: string;
}

export class CreateRoleUseCase {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly eventBus?: EventBus,
  ) {}

  async execute(data: CreateRoleDTO): Promise<Role> {
    // Check if role with same name already exists
    const existingRole = await this.roleRepository.findByName(data.name);
    if (existingRole) {
      throw new DuplicateEntityError('Role', 'name', data.name);
    }

    // Fallback: if permissionIds is empty, get default permissions from SYSTEM_ROLES
    let permissionNames: string[] = [];
    if (data.permissionIds && data.permissionIds.length > 0) {
      // Get permissions by ID normally
      const permissions = await Promise.all(
        data.permissionIds.map(async (id) => {
          const permission = await this.permissionRepository.findById(id);
          if (!permission) {
            throw new Error(`Permission with id ${id} not found`);
          }
          return permission;
        }),
      );
      const role = Role.create({
        name: data.name,
        description: data.description,
        level: data.level,
        isSystem: data.isSystem || false,
        permissions,
      });
      await this.roleRepository.create(role);
      if (this.eventBus) {
        const roleCreatedEvent = new RoleCreatedEvent(role, data.createdBy);
        await this.eventBus.publish(roleCreatedEvent);
      }
      return role;
    } else {
      // Get default permissions from SYSTEM_ROLES
      const systemRole = SYSTEM_ROLES[data.name as keyof typeof SYSTEM_ROLES];
      if (
        systemRole &&
        systemRole.permissions &&
        systemRole.permissions.length > 0
      ) {
        permissionNames = Array.from(systemRole.permissions);
      }
    }

    let permissions: Permission[] = [];
    if (permissionNames.length > 0) {
      permissions = await Promise.all(
        permissionNames.map(async (name) => {
          const permission = await this.permissionRepository.findByName(name);
          if (!permission) {
            throw new Error(`Permission with name ${name} not found`);
          }
          return permission;
        }),
      );
    }

    const role = Role.create({
      name: data.name,
      description: data.description,
      level: data.level,
      isSystem: data.isSystem || false,
      permissions,
    });

    await this.roleRepository.create(role);

    // Trigger role created event if eventBus is available
    if (this.eventBus) {
      const roleCreatedEvent = new RoleCreatedEvent(role, data.createdBy);
      await this.eventBus.publish(roleCreatedEvent);
    }

    return role;
  }
}
