import { EventHandler } from '@/core/events';
import { SpaceDeletedEvent } from '../../domain/events/space-deleted.event';
import { logger } from '@/config/logger';

export class SpaceDeletedHandler implements EventHandler<SpaceDeletedEvent> {
  async handle(event: SpaceDeletedEvent): Promise<void> {
    logger.info({
      type: 'space_deleted_handler',
      eventId: event.eventId,
      spaceId: event.space.id.toString(),
      spaceTitle: event.space.title,
      deletedBy: event.deletedBy,
    });

    // Aqui você pode adicionar lógicas como:
    // - Invalidar cache do espaço
    // - Cancelar appointments futuros
    // - Registrar auditoria
    // - Limpar dados relacionados

    // Exemplo: Invalidar cache
    await this.invalidateSpaceCache(event.space.id.toString());

    // Exemplo: Registrar auditoria
    await this.recordSpaceDeletionAudit(event);

    // Exemplo: Limpar dados relacionados
    await this.cleanupSpaceData(event.space.id.toString());
  }

  private async invalidateSpaceCache(spaceId: string): Promise<void> {
    // Simulação de invalidação de cache
    logger.info({
      type: 'space_cache_invalidated',
      spaceId,
    });
  }

  private async recordSpaceDeletionAudit(
    event: SpaceDeletedEvent,
  ): Promise<void> {
    // Simulação de registro de auditoria
    logger.info({
      type: 'space_deletion_audit',
      spaceId: event.space.id.toString(),
      deletedBy: event.deletedBy,
      timestamp: event.occurredAt.toISOString(),
    });
  }

  private async cleanupSpaceData(spaceId: string): Promise<void> {
    // Simulação de limpeza de dados relacionados
    logger.info({
      type: 'space_data_cleanup',
      spaceId,
    });
  }
}
