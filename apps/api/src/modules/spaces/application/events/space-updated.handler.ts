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

    await this.invalidateSpaceCache(event.space.id.toString());

    await this.recordSpaceUpdateAudit(event);
  }

  private async invalidateSpaceCache(spaceId: string): Promise<void> {
    logger.info({
      type: 'space_cache_invalidated',
      spaceId,
    });
  }

  private async recordSpaceUpdateAudit(
    event: SpaceUpdatedEvent,
  ): Promise<void> {
    logger.info({
      type: 'space_update_audit',
      spaceId: event.space.id.toString(),
      updatedBy: event.updatedBy,
      changes: event.changes,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
