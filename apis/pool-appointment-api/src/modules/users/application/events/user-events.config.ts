import { EventBus } from '@/core/events';
import { UserCreatedHandler } from './user-created.handler';
import { UserUpdatedHandler } from './user-updated.handler';
import { UserDeletedHandler } from './user-deleted.handler';

export function configureUserEvents(eventBus: EventBus): void {
  // Registrar handlers para eventos de usuário
  eventBus.registerHandler('UserCreated', UserCreatedHandler);
  eventBus.registerHandler('UserUpdated', UserUpdatedHandler);
  eventBus.registerHandler('UserDeleted', UserDeletedHandler);
}
