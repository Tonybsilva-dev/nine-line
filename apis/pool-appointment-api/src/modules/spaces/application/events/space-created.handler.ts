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

    // Aqui você pode adicionar lógicas como:
    // - Notificar o host sobre o espaço criado
    // - Criar índices de busca
    // - Registrar métricas
    // - Invalidar cache

    // Exemplo: Notificar o host
    await this.notifyHost(event.space);

    // Exemplo: Registrar métrica
    await this.recordSpaceCreationMetric(event);
  }

  private async notifyHost(space: {
    id: { toString: () => string };
    title: string;
    hostId: string;
  }): Promise<void> {
    // Simulação de notificação ao host
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
    // Simulação de registro de métrica
    logger.info({
      type: 'space_creation_metric',
      spaceId: event.space.id.toString(),
      hostId: event.space.hostId,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
