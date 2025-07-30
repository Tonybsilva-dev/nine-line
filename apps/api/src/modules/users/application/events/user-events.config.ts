import { EventBus } from '@/core/events';
import { UserUpdatedHandler } from './user-updated.handler';
import { UserDeletedHandler } from './user-deleted.handler';

export function configureUserEvents(eventBus: EventBus): void {
  // Registrar handlers para eventos de usuário
  // UserCreatedHandler foi removido - o envio de email é responsabilidade do UserCreatedNotificationHandler
  eventBus.registerHandler('UserUpdated', UserUpdatedHandler);
  eventBus.registerHandler('UserDeleted', UserDeletedHandler);
}
