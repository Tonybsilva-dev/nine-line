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

    // RBAC: associar usuário à role informada
    try {
      const roleRepo = new PrismaRoleRepository();
      const userRoleRepo = new PrismaUserRoleRepository();
      const userId = event.user.id.toString();
      const roleName = event.user.role;
      const role = await roleRepo.findByName(roleName);
      if (!role) {
        logger.error({
          type: 'user_created_handler',
          message: `Role ${roleName} não encontrada para o usuário ${userId}`,
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
          message: `Role ${roleName} associada ao usuário ${userId}`,
        });
      }
    } catch (err) {
      logger.error({
        type: 'user_created_handler',
        message: 'Erro ao associar role ao usuário',
        error: err,
      });
    }

    // Aqui você pode adicionar lógicas como:
    // - Enviar email de boas-vindas
    // - Criar perfil padrão
    // - Notificar sistemas externos
    // - Registrar métricas
    // - Invalidar cache

    // Exemplo: Enviar email de boas-vindas
    await this.sendWelcomeEmail(event.user);

    // Exemplo: Registrar métrica
    await this.recordUserCreationMetric(event);
  }

  private async sendWelcomeEmail(user: {
    id: { toString: () => string };
    email: string;
  }): Promise<void> {
    // Simulação de envio de email
    logger.info({
      type: 'welcome_email_sent',
      userId: user.id.toString(),
      userEmail: user.email,
    });
  }

  private async recordUserCreationMetric(
    event: UserCreatedEvent,
  ): Promise<void> {
    // Simulação de registro de métrica
    logger.info({
      type: 'user_creation_metric',
      userId: event.user.id.toString(),
      userRole: event.user.role,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
