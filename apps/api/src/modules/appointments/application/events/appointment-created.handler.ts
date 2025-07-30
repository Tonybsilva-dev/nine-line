import { EventHandler } from '@/core/events';
import { AppointmentCreatedEvent } from '../../domain/events/appointment-created.event';
import { logger } from '@/config/logger';
import { AppointmentCreatedNotificationHandler } from '@/modules/notifications/application/events/appointment-created.handler';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';

export class AppointmentCreatedHandler
  implements EventHandler<AppointmentCreatedEvent>
{
  private notificationHandler: AppointmentCreatedNotificationHandler;

  constructor() {
    // TODO: Injetar repositórios via DI
    this.notificationHandler = new AppointmentCreatedNotificationHandler(
      {} as SpaceRepository,
    );
  }

  async handle(event: AppointmentCreatedEvent): Promise<void> {
    logger.info({
      type: 'appointment_created_handler',
      eventId: event.eventId,
      appointmentId: event.appointment.id.toString(),
      spaceId: event.appointment.spaceId,
      userId: event.appointment.userId,
      createdBy: event.createdBy,
    });

    // Processar notificação
    try {
      await this.notificationHandler.handle(event);
    } catch (error) {
      logger.error({
        type: 'appointment_notification_error',
        eventId: event.eventId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    // Exemplo: Notificar o usuário
    await this.notifyUser(event.appointment);

    // Exemplo: Registrar métrica
    await this.recordAppointmentCreationMetric(event);
  }

  private async notifyUser(appointment: {
    id: { toString: () => string };
    userId: string;
    spaceId: string;
    startTime: Date;
  }): Promise<void> {
    // Simulação de notificação ao usuário
    logger.info({
      type: 'user_notification_sent',
      appointmentId: appointment.id.toString(),
      userId: appointment.userId,
      spaceId: appointment.spaceId,
      startTime: appointment.startTime,
    });
  }

  private async recordAppointmentCreationMetric(
    event: AppointmentCreatedEvent,
  ): Promise<void> {
    // Simulação de registro de métrica
    logger.info({
      type: 'appointment_creation_metric',
      appointmentId: event.appointment.id.toString(),
      spaceId: event.appointment.spaceId,
      userId: event.appointment.userId,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
