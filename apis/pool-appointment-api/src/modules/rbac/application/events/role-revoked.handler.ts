import { EventHandler } from '@/core/events';
import { RoleRevokedEvent } from '../../domain/events';
import { logger } from '@/config/logger';

export class RoleRevokedHandler implements EventHandler<RoleRevokedEvent> {
  async handle(event: RoleRevokedEvent): Promise<void> {
    logger.info('Role revoked from user', {
      event: 'RoleRevoked',
      userId: event.userRole.userId,
      roleId: event.userRole.roleId,
      revokedBy: event.revokedBy,
      assignedAt: event.userRole.assignedAt,
    });

    // Aqui você pode adicionar lógicas como:
    // - Enviar email de notificação
    // - Limpar cache de permissões
    // - Registrar auditoria
    // - Notificar outros sistemas
  }
}
