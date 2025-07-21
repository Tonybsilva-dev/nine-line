import { EventHandler } from '@/core/events';
import { SpaceUpdatedEvent } from '../../domain/events/space-updated.event';
import { logger } from '@/config/logger';

export class SpaceUpdatedHandler implements EventHandler<SpaceUpdatedEvent> {
  async handle(event: SpaceUpdatedEvent): Promise<void> {
    logger.info({
      type: 'space_updated_handler',
      eventId: event.eventId,
      spaceId: event.space.id.toString(),
      spaceTitle: event.space.title,
      updatedBy: event.updatedBy,
      changes: event.changes,
    });

    // Aqui você pode adicionar lógicas como:
    // - Invalidar cache do espaço
    // - Atualizar índices de busca
    // - Registrar auditoria
    // - Notificar usuários interessados

    // Exemplo: Invalidar cache
    await this.invalidateSpaceCache(event.space.id.toString());

    // Exemplo: Registrar auditoria
    await this.recordSpaceUpdateAudit(event);
  }

  private async invalidateSpaceCache(spaceId: string): Promise<void> {
    // Simulação de invalidação de cache
    logger.info({
      type: 'space_cache_invalidated',
      spaceId,
    });
  }

  private async recordSpaceUpdateAudit(
    event: SpaceUpdatedEvent,
  ): Promise<void> {
    // Simulação de registro de auditoria
    logger.info({
      type: 'space_update_audit',
      spaceId: event.space.id.toString(),
      updatedBy: event.updatedBy,
      changes: event.changes,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
