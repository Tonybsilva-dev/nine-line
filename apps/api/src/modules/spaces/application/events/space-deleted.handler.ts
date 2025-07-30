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

    await this.invalidateSpaceCache(event.space.id.toString());

    await this.recordSpaceDeletionAudit(event);

    await this.cleanupSpaceData(event.space.id.toString());
  }

  private async invalidateSpaceCache(spaceId: string): Promise<void> {
    // Simulate cache invalidation
    logger.info({
      type: 'space_cache_invalidated',
      spaceId,
    });
  }

  private async recordSpaceDeletionAudit(
    event: SpaceDeletedEvent,
  ): Promise<void> {
    // Simulate audit record
    logger.info({
      type: 'space_deletion_audit',
      spaceId: event.space.id.toString(),
      deletedBy: event.deletedBy,
      timestamp: event.occurredAt.toISOString(),
    });
  }

  private async cleanupSpaceData(spaceId: string): Promise<void> {
    // Simulate data cleanup
    logger.info({
      type: 'space_data_cleanup',
      spaceId,
    });
  }
}
