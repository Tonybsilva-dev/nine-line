import { EventHandler } from '@/core/events';
import { SpaceCreatedEvent } from '../../domain/events/space-created.event';
import { logger } from '@/config/logger';

export class SpaceCreatedHandler implements EventHandler<SpaceCreatedEvent> {
  async handle(event: SpaceCreatedEvent): Promise<void> {
    logger.info({
      type: 'space_created_handler',
      eventId: event.eventId,
      spaceId: event.space.id.toString(),
      spaceTitle: event.space.title,
      hostId: event.space.hostId,
      createdBy: event.createdBy,
    });

    await this.notifyHost(event.space);

    await this.recordSpaceCreationMetric(event);
  }

  private async notifyHost(space: {
    id: { toString: () => string };
    title: string;
    hostId: string;
  }): Promise<void> {
    logger.info({
      type: 'host_notification_sent',
      spaceId: space.id.toString(),
      spaceTitle: space.title,
      hostId: space.hostId,
    });
  }

  private async recordSpaceCreationMetric(
    event: SpaceCreatedEvent,
  ): Promise<void> {
    logger.info({
      type: 'space_creation_metric',
      spaceId: event.space.id.toString(),
      hostId: event.space.hostId,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
