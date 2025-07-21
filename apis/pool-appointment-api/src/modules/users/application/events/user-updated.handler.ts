import { EventHandler } from '@/core/events';
import { UserUpdatedEvent } from '../../domain/events/user-updated.event';
import { logger } from '@/config/logger';

export class UserUpdatedHandler implements EventHandler<UserUpdatedEvent> {
  async handle(event: UserUpdatedEvent): Promise<void> {
    logger.info({
      type: 'user_updated_handler',
      eventId: event.eventId,
      userId: event.user.id.toString(),
      userEmail: event.user.email,
      updatedBy: event.updatedBy,
      changes: event.changes,
    });

    // Aqui você pode adicionar lógicas como:
    // - Invalidar cache do usuário
    // - Notificar sistemas externos
    // - Registrar auditoria
    // - Atualizar índices de busca

    // Exemplo: Invalidar cache
    await this.invalidateUserCache(event.user.id.toString());

    // Exemplo: Registrar auditoria
    await this.recordUserUpdateAudit(event);
  }

  private async invalidateUserCache(userId: string): Promise<void> {
    // Simulação de invalidação de cache
    logger.info({
      type: 'user_cache_invalidated',
      userId,
    });
  }

  private async recordUserUpdateAudit(event: UserUpdatedEvent): Promise<void> {
    // Simulação de registro de auditoria
    logger.info({
      type: 'user_update_audit',
      userId: event.user.id.toString(),
      updatedBy: event.updatedBy,
      changes: event.changes,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
