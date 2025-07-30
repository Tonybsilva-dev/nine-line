import { NotificationRepository } from '@/modules/notifications/domain/repositories/notification-repository';
import { NotificationTemplateRepository } from '@/modules/notifications/domain/repositories/notification-template-repository';
import { UserRepository } from '@/modules/users/domain/repositories/user.repository';
import { EmailService } from '@/modules/notifications/infra/services/email.service';
import { QueueService } from '@/modules/notifications/infra/services/queue.service';
import { logger } from '@/config/logger';

export interface SendNotificationDTO {
  userId: string;
  type: 'EMAIL' | 'SMS' | 'PUSH';
  templateId: string;
  payload: Record<string, unknown>;
}

export class SendNotificationUseCase {
  constructor(
    private notificationRepository: NotificationRepository,
    private templateRepository: NotificationTemplateRepository,
    private userRepository: UserRepository,
    private emailService: EmailService,
    private queueService: QueueService,
  ) {}

  async execute(data: SendNotificationDTO): Promise<void> {
    logger.info({
      type: 'send_notification_use_case_executed',
      userId: data.userId,
      templateId: data.templateId,
      notificationType: data.type,
      payload: data.payload,
    });

    // TODO: Implementar repositórios e fila
    // Por enquanto, vamos apenas logar
    logger.info({
      type: 'notification_use_case_log',
      message: 'SendNotificationUseCase executado com sucesso',
      data,
    });
  }
}
