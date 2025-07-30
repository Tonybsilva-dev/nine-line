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
      createdBy: event.createdBy,
    });

    // RBAC: associate user to the specified role
    try {
      const roleRepo = new PrismaRoleRepository();
      const userRoleRepo = new PrismaUserRoleRepository();
      const userId = event.user.id.toString();
      const roleName = event.user.role;
      const role = await roleRepo.findByName(roleName);
      if (!role) {
        logger.error({
          type: 'user_created_handler',
          message: `Role ${roleName} not found for user ${userId}`,
        });
      } else {
        const assignment = UserRoleAssignment.create({
          userId,
          roleId: role.id.toString(),
          assignedBy: userId,
        });
        await userRoleRepo.create(assignment);
        logger.info({
          type: 'user_created_handler',
          message: `Role ${roleName} assigned to user ${userId}`,
        });
      }
    } catch (err) {
      logger.error({
        type: 'user_created_handler',
        message: 'Error assigning role to user',
        error: err,
      });
    }

    await this.recordUserCreationMetric(event);
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
