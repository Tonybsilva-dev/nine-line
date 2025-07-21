import { EventHandler } from '@/core/events';
import { RatingCreatedEvent } from '../../domain/events/rating-created.event';
import { logger } from '@/config/logger';

export class RatingCreatedHandler implements EventHandler<RatingCreatedEvent> {
  async handle(event: RatingCreatedEvent): Promise<void> {
    logger.info({
      type: 'rating_created_handler',
      eventId: event.eventId,
      ratingId: event.rating.id.toString(),
      spaceId: event.rating.spaceId,
      userId: event.rating.userId,
      score: event.rating.score,
      createdBy: event.createdBy,
    });

    // Aqui você pode adicionar lógicas como:
    // - Atualizar média de rating do espaço
    // - Notificar o host sobre nova avaliação
    // - Registrar métricas
    // - Invalidar cache

    // Exemplo: Atualizar média do espaço
    await this.updateSpaceAverageRating(event.rating);

    // Exemplo: Registrar métrica
    await this.recordRatingCreationMetric(event);
  }

  private async updateSpaceAverageRating(rating: {
    spaceId: string;
    score: number;
  }): Promise<void> {
    // Simulação de atualização da média do espaço
    logger.info({
      type: 'space_average_rating_updated',
      spaceId: rating.spaceId,
      score: rating.score,
    });
  }

  private async recordRatingCreationMetric(
    event: RatingCreatedEvent,
  ): Promise<void> {
    // Simulação de registro de métrica
    logger.info({
      type: 'rating_creation_metric',
      ratingId: event.rating.id.toString(),
      spaceId: event.rating.spaceId,
      userId: event.rating.userId,
      score: event.rating.score,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
