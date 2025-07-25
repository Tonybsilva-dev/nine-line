import { EventBus } from '@/core/events';
import { SpaceCreatedHandler } from './space-created.handler';
import { SpaceUpdatedHandler } from './space-updated.handler';
import { SpaceDeletedHandler } from './space-deleted.handler';

export function configureSpaceEvents(eventBus: EventBus): void {
  // Register handlers for space events
  eventBus.registerHandler('SpaceCreated', SpaceCreatedHandler);
  eventBus.registerHandler('SpaceUpdated', SpaceUpdatedHandler);
  eventBus.registerHandler('SpaceDeleted', SpaceDeletedHandler);
}
