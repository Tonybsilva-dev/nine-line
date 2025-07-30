import { EventHandler } from '@/core/events';
import { AppointmentCreatedEvent } from '@/modules/appointments/domain/events/appointment-created.event';
import { SendNotificationUseCase } from '../use-cases/send-notification/send-notification.use-case';
import { NotificationRepository } from '@/modules/notifications/domain/repositories/notification-repository';
import { NotificationTemplateRepository } from '@/modules/notifications/domain/repositories/notification-template-repository';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { EmailService } from '@/modules/notifications/infra/services/email.service';
import { QueueService } from '@/modules/notifications/infra/services/queue.service';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';
import { logger } from '@/config/logger';
import { PrismaClient } from '@prisma/client';
import { SmtpEmailService } from '@/modules/notifications/infra/services/smtp-email.service';
import { ENV_CONFIG } from '@/config/env';

export class AppointmentCreatedNotificationHandler
  implements EventHandler<AppointmentCreatedEvent>
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

  async handle(event: AppointmentCreatedEvent): Promise<void> {
    logger.info({
      type: 'appointment_created_notification_handler',
      eventId: event.eventId,
      appointmentId: event.appointment.id.toString(),
      userId: event.appointment.userId,
      spaceId: event.appointment.spaceId,
    });

    const prisma = new PrismaClient();

    try {
      // Buscar informações reais do espaço e usuário
      const [space, user] = await Promise.all([
        prisma.space.findUnique({
          where: { id: event.appointment.spaceId },
          select: { id: true, title: true, hostId: true },
        }),
        prisma.user.findUnique({
          where: { id: event.appointment.userId },
          select: { id: true, name: true, email: true },
        }),
      ]);

      if (!space) {
        logger.error({
          type: 'space_not_found_for_notification',
          spaceId: event.appointment.spaceId,
          appointmentId: event.appointment.id.toString(),
        });
        return;
      }

      if (!user) {
        logger.error({
          type: 'user_not_found_for_notification',
          userId: event.appointment.userId,
          appointmentId: event.appointment.id.toString(),
        });
        return;
      }

      logger.info({
        type: 'space_and_user_found_for_notification',
        spaceId: event.appointment.spaceId,
        spaceTitle: space.title,
        hostId: space.hostId,
        userName: user.name,
        userEmail: user.email,
      });

      // Buscar template de notificação
      const template = await prisma.notificationTemplate.findUnique({
        where: { name: 'appointment-pending-approval' },
        select: { id: true, name: true, subject: true },
      });

      if (!template) {
        logger.error({
          type: 'template_not_found_for_notification',
          templateName: 'appointment-pending-approval',
          appointmentId: event.appointment.id.toString(),
        });
        return;
      }

      // Buscar email do host
      const host = await prisma.user.findUnique({
        where: { id: space.hostId },
        select: { email: true, name: true },
      });

      if (!host) {
        logger.error({
          type: 'host_not_found_for_notification',
          hostId: space.hostId,
          appointmentId: event.appointment.id.toString(),
        });
        return;
      }

      // Enviar notificação diretamente via SMTP
      const emailService = new SmtpEmailService();

      const notificationPayload = {
        appointmentId: event.appointment.id.toString(),
        spaceTitle: space.title,
        userName: user.name,
        appointmentDate: event.appointment.date.toLocaleDateString('pt-BR'),
        startTime: event.appointment.startTime.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        endTime: event.appointment.endTime.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        // Variáveis específicas para o template appointment-pending-approval
        managerName: host.name,
        siteName: '9line Spaces',
        startDate: event.appointment.date.toLocaleDateString('pt-BR'),
        endDate: event.appointment.date.toLocaleDateString('pt-BR'),
        guestCount: '1',
        additionalNotes: 'Agendamento criado via API',
        approveUrl: `${ENV_CONFIG.APP_URL}/admin/appointments/${event.appointment.id.toString()}/approve`,
        rejectUrl: `${ENV_CONFIG.APP_URL}/admin/appointments/${event.appointment.id.toString()}/reject`,
        siteUrl: ENV_CONFIG.APP_URL,
        supportEmail: 'suporte@nine-line.com',
        supportPhone: '(11) 99999-9999',
        adminUrl: ENV_CONFIG.APP_URL,
        templateName: template.name,
      };

      // Enviar email
      await emailService.sendTemplateEmail({
        to: host.email,
        templateId: template.id,
        subject:
          template.subject ||
          '🗓️ Nova solicitação de agendamento aguardando aprovação',
        variables: notificationPayload,
      });

      // Criar registro da notificação no banco
      await prisma.notification.create({
        data: {
          userId: space.hostId,
          type: 'EMAIL',
          templateId: template.id,
          status: 'SENT',
          payload: notificationPayload,
          sentAt: new Date(),
        },
      });

      logger.info({
        type: 'appointment_pending_notification_sent',
        appointmentId: event.appointment.id.toString(),
        hostId: space.hostId,
        hostEmail: host.email,
        spaceTitle: space.title,
        templateName: template.name,
      });
    } catch (error) {
      logger.error({
        type: 'appointment_created_notification_error',
        eventId: event.eventId,
        appointmentId: event.appointment.id.toString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      await prisma.$disconnect();
    }
  }
}
