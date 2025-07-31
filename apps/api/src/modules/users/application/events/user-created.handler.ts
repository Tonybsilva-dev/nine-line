import { EventHandler } from '@/core/events';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { logger } from '@/config/logger';

import { UserRoleAssignment } from '@/modules/rbac/domain/entities';
import { PrismaRoleRepository } from '@/modules/rbac/infra/repositories/prisma-role.repository';
import { PrismaUserRoleRepository } from '@/modules/rbac/infra/repositories/prisma-user-role.repository';

export class UserCreatedHandler implements EventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent): Promise<void> {
    logger.info({
      type: 'user_created_handler',
      eventId: event.eventId,
      userId: event.user.id.toString(),
      userEmail: event.user.email,
      userRole: event.user.role,
      createdBy: event.createdBy,
    });

    // RBAC: associate user to the specified role
    try {
      const roleRepo = new PrismaRoleRepository();
      const userRoleRepo = new PrismaUserRoleRepository();
      const userId = event.user.id.toString();
      const roleName = event.user.role;

      logger.info({
        type: 'user_created_handler',
        message: `Looking for role: ${roleName}`,
        userId,
      });

      const role = await roleRepo.findByName(roleName);

      if (!role) {
        logger.error({
          type: 'user_created_handler',
          message: `Role ${roleName} not found for user ${userId}`,
          availableRoles: await this.getAvailableRoles(),
        });
        return;
      }

      logger.info({
        type: 'user_created_handler',
        message: `Found role: ${role.name} (ID: ${role.id.toString()})`,
        roleLevel: role.level,
        rolePermissions: role.permissions.length,
      });

      // Verificar se já existe assignment
      const existingAssignment = await userRoleRepo.findByUserIdAndRoleId(
        userId,
        role.id.toString(),
      );

      if (existingAssignment) {
        logger.info({
          type: 'user_created_handler',
          message: `User ${userId} already has role ${roleName} assigned`,
        });
        return;
      }

      const assignment = UserRoleAssignment.create({
        userId,
        roleId: role.id.toString(),
        assignedBy: userId,
      });

      await userRoleRepo.create(assignment);

      logger.info({
        type: 'user_created_handler',
        message: `Role ${roleName} successfully assigned to user ${userId}`,
        assignmentId: assignment.id.toString(),
      });
    } catch (err) {
      logger.error({
        type: 'user_created_handler',
        message: 'Error assigning role to user',
        error: err,
        userId: event.user.id.toString(),
        userRole: event.user.role,
      });
    }

    await this.recordUserCreationMetric(event);
  }

  private async getAvailableRoles(): Promise<string[]> {
    try {
      const roleRepo = new PrismaRoleRepository();
      const { roles } = await roleRepo.findAll({ page: 1, perPage: 100 });
      return roles.map((role) => role.name);
    } catch (error) {
      logger.error('Error getting available roles:', error);
      return [];
    }
  }

  private async recordUserCreationMetric(
    event: UserCreatedEvent,
  ): Promise<void> {
    logger.info({
      type: 'user_creation_metric',
      userId: event.user.id.toString(),
      userRole: event.user.role,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
