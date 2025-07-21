import { EventBus } from '@/core/events';
import { AppointmentCreatedHandler } from './appointment-created.handler';
import { AppointmentUpdatedHandler } from './appointment-updated.handler';
import { AppointmentDeletedHandler } from './appointment-deleted.handler';

export function configureAppointmentEvents(eventBus: EventBus): void {
  // Registrar handlers para eventos de appointment
  eventBus.registerHandler('AppointmentCreated', AppointmentCreatedHandler);
  eventBus.registerHandler('AppointmentUpdated', AppointmentUpdatedHandler);
  eventBus.registerHandler('AppointmentDeleted', AppointmentDeletedHandler);
}
