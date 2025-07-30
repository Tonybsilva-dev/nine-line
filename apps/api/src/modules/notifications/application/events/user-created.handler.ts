import { EventHandler } from '@/core/events';
import { UserCreatedEvent } from '@/modules/users/domain/events/user-created.event';
import { logger } from '@/config/logger';
import { PrismaClient } from '@prisma/client';
import { SmtpEmailService } from '@/modules/notifications/infra/services/smtp-email.service';
import { ENV_CONFIG } from '@/config/env';

export class UserCreatedNotificationHandler
  implements EventHandler<UserCreatedEvent>
{
  async handle(event: UserCreatedEvent): Promise<void> {
    logger.info({
      type: 'user_created_notification_handler',
      eventId: event.eventId,
      userId: event.user.id.toString(),
      userEmail: event.user.email,
    });

    const prisma = new PrismaClient();

    try {
      // Buscar template de notificação
      const template = await prisma.notificationTemplate.findUnique({
        where: { name: 'welcome-email' },
        select: { id: true, name: true, subject: true },
      });

      if (!template) {
        logger.error({
          type: 'template_not_found_for_welcome_notification',
          templateName: 'welcome-email',
          userId: event.user.id.toString(),
        });
        return;
      }

      logger.info({
        type: 'template_found_for_welcome_notification',
        templateId: template.id,
        templateName: template.name,
        userId: event.user.id.toString(),
      });

      // Enviar notificação diretamente via SMTP
      const emailService = new SmtpEmailService();

      const notificationPayload = {
        userName: event.user.name,
        userEmail: event.user.email,
        appUrl: ENV_CONFIG.APP_URL,
        templateName: template.name,
      };

      logger.info({
        type: 'sending_welcome_email',
        userId: event.user.id.toString(),
        userEmail: event.user.email,
        templateId: template.id,
        payload: notificationPayload,
      });

      // Enviar email
      await emailService.sendTemplateEmail({
        to: event.user.email,
        templateId: template.id,
        subject: template.subject || '🎉 Bem-vindo(a) à nossa comunidade!',
        variables: notificationPayload,
      });

      // Criar registro da notificação no banco
      await prisma.notification.create({
        data: {
          userId: event.user.id.toString(),
          type: 'EMAIL',
          templateId: template.id,
          status: 'SENT',
          payload: notificationPayload,
          sentAt: new Date(),
        },
      });

      logger.info({
        type: 'welcome_email_sent_successfully',
        userId: event.user.id.toString(),
        userEmail: event.user.email,
        templateName: template.name,
        templateId: template.id,
      });
    } catch (error) {
      logger.error({
        type: 'user_created_notification_error',
        eventId: event.eventId,
        userId: event.user.id.toString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
    } finally {
      await prisma.$disconnect();
    }
  }
}
