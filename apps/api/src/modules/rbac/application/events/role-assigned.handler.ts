import { EventHandler } from '@/core/events';
import { RoleAssignedEvent } from '../../domain/events';
import { logger } from '@/config/logger';

export class RoleAssignedHandler implements EventHandler<RoleAssignedEvent> {
  async handle(event: RoleAssignedEvent): Promise<void> {
    logger.info('Role assigned to user', {
      event: 'RoleAssigned',
      userId: event.userRole.userId,
      roleId: event.userRole.roleId,
      assignedBy: event.userRole.assignedBy,
      assignedAt: event.userRole.assignedAt,
      expiresAt: event.userRole.expiresAt,
    });

    // Aqui você pode adicionar lógicas como:
    // - Enviar email de notificação
    // - Atualizar cache de permissões
    // - Registrar auditoria
    // - Notificar outros sistemas
  }
}
