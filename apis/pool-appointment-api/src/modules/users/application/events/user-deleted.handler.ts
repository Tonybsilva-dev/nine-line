import { EventHandler } from '@/core/events';
import { UserDeletedEvent } from '../../domain/events/user-deleted.event';
import { logger } from '@/config/logger';

export class UserDeletedHandler implements EventHandler<UserDeletedEvent> {
  async handle(event: UserDeletedEvent): Promise<void> {
    logger.info({
      type: 'user_deleted_handler',
      eventId: event.eventId,
      userId: event.user.id.toString(),
      userEmail: event.user.email,
      deletedBy: event.deletedBy,
    });

    await this.invalidateUserCache(event.user.id.toString());

    await this.recordUserDeletionAudit(event);

    await this.cleanupUserData(event.user.id.toString());
  }

  private async invalidateUserCache(userId: string): Promise<void> {
    logger.info({
      type: 'user_cache_invalidated',
      userId,
    });
  }

  private async recordUserDeletionAudit(
    event: UserDeletedEvent,
  ): Promise<void> {
    logger.info({
      type: 'user_deletion_audit',
      userId: event.user.id.toString(),
      deletedBy: event.deletedBy,
      timestamp: event.occurredAt.toISOString(),
    });
  }

  private async cleanupUserData(userId: string): Promise<void> {
    // Simulação de limpeza de dados relacionados
    logger.info({
      type: 'user_data_cleanup',
      userId,
    });
  }
}
