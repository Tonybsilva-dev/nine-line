import { EventBus } from '@/core/events';
import { RatingCreatedHandler } from './rating-created.handler';

export function configureRatingEvents(eventBus: EventBus): void {
  // Registrar handlers para eventos de rating
  eventBus.registerHandler('RatingCreated', RatingCreatedHandler);
}
