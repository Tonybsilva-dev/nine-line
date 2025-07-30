import { EventBus } from '@/core/events';
import { UserCreatedNotificationHandler } from './user-created.handler';
import { AppointmentCreatedNotificationHandler } from './appointment-created.handler';
import { AppointmentApprovedNotificationHandler } from './appointment-approved.handler';
import { AppointmentCancelledNotificationHandler } from './appointment-cancelled.handler';
import { AppointmentCreatedEvent } from '@/modules/appointments/domain/events/appointment-created.event';
import { AppointmentApprovedEvent } from '@/modules/appointments/domain/events/appointment-approved.event';
import { AppointmentDeletedEvent } from '@/modules/appointments/domain/events/appointment-deleted.event';
import { PrismaSpaceRepository } from '@/modules/spaces/infra/repositories/prisma-space.repository';

export function configureNotificationEvents(eventBus: EventBus): void {
  const spaceRepository = new PrismaSpaceRepository();

  // User Events - Enviar email de boas-vindas
  eventBus.register('UserCreated', new UserCreatedNotificationHandler());

  // Appointment Events
  eventBus.register(
    AppointmentCreatedEvent.name,
    new AppointmentCreatedNotificationHandler(spaceRepository),
  );

  eventBus.register(
    AppointmentApprovedEvent.name,
    new AppointmentApprovedNotificationHandler(spaceRepository),
  );

  eventBus.register(
    AppointmentDeletedEvent.name,
    new AppointmentCancelledNotificationHandler(spaceRepository),
  );
}
