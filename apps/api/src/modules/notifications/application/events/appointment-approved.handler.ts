import { EventHandler } from '@/core/events';
import { AppointmentApprovedEvent } from '@/modules/appointments/domain/events/appointment-approved.event';
import { SendNotificationUseCase } from '../use-cases/send-notification/send-notification.use-case';
import { NotificationRepository } from '@/modules/notifications/domain/repositories/notification-repository';
import { NotificationTemplateRepository } from '@/modules/notifications/domain/repositories/notification-template-repository';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { EmailService } from '@/modules/notifications/infra/services/email.service';
import { QueueService } from '@/modules/notifications/infra/services/queue.service';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { logger } from '@/config/logger';

export class AppointmentApprovedNotificationHandler
  implements EventHandler<AppointmentApprovedEvent>
{
  private sendNotificationUseCase: SendNotificationUseCase;

  constructor(private spaceRepository: SpaceRepository) {
    // Inicializar o caso de uso com as dependências necessárias
    // Em uma implementação real, isso seria injetado via DI
    const notificationRepository = {} as NotificationRepository;
    const templateRepository = {} as NotificationTemplateRepository;
    const userRepository = {} as UserRepository;
    const emailService = {} as EmailService;
    const queueService = {} as QueueService;

    this.sendNotificationUseCase = new SendNotificationUseCase(
      notificationRepository,
      templateRepository,
      userRepository,
      emailService,
      queueService,
    );
  }

  async handle(event: AppointmentApprovedEvent): Promise<void> {
    logger.info({
      type: 'appointment_approved_notification_handler',
      eventId: event.eventId,
      appointmentId: event.appointment.id.toString(),
      userId: event.appointment.userId,
      spaceId: event.appointment.spaceId,
      approvedBy: event.approvedBy,
    });

    try {
      // Buscar informações do espaço
      const space = await this.spaceRepository.findById(
        event.appointment.spaceId,
      );
      if (!space) {
        logger.error({
          type: 'space_not_found_for_approval_notification',
          spaceId: event.appointment.spaceId,
          appointmentId: event.appointment.id.toString(),
        });
        return;
      }

      // Notificar usuário sobre aprovação
      await this.sendNotificationUseCase.execute({
        userId: event.appointment.userId,
        type: 'EMAIL',
        templateId: 'appointment-approved',
        payload: {
          appointmentId: event.appointment.id.toString(),
          spaceTitle: space.title,
          userName: 'Usuário', // TODO: Buscar nome do usuário
          appointmentDate: event.appointment.date.toLocaleDateString('pt-BR'),
          startTime: event.appointment.startTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          endTime: event.appointment.endTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          appUrl: process.env.APP_URL || 'http://localhost:3000',
        },
      });

      logger.info({
        type: 'appointment_approved_user_notification_sent',
        appointmentId: event.appointment.id.toString(),
        userId: event.appointment.userId,
        spaceTitle: space.title,
      });

      // Notificar host sobre aprovação (confirmação)
      await this.sendNotificationUseCase.execute({
        userId: space.hostId,
        type: 'EMAIL',
        templateId: 'appointment-approved-host',
        payload: {
          appointmentId: event.appointment.id.toString(),
          spaceTitle: space.title,
          userName: 'Usuário', // TODO: Buscar nome do usuário
          appointmentDate: event.appointment.date.toLocaleDateString('pt-BR'),
          startTime: event.appointment.startTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          endTime: event.appointment.endTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          approvedBy: event.approvedBy || 'Sistema',
        },
      });

      logger.info({
        type: 'appointment_approved_host_notification_sent',
        appointmentId: event.appointment.id.toString(),
        hostId: space.hostId,
        spaceTitle: space.title,
      });
    } catch (error) {
      logger.error({
        type: 'appointment_approved_notification_error',
        eventId: event.eventId,
        appointmentId: event.appointment.id.toString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
