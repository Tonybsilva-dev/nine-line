import { EventHandler } from '@/core/events';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { logger } from '@/config/logger';

export class UserCreatedHandler implements EventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent): Promise<void> {
    logger.info({
      type: 'user_created_handler',
      eventId: event.eventId,
      userId: event.user.id.toString(),
      userEmail: event.user.email,
      createdBy: event.createdBy,
    });

    // Aqui você pode adicionar lógicas como:
    // - Enviar email de boas-vindas
    // - Criar perfil padrão
    // - Notificar sistemas externos
    // - Registrar métricas
    // - Invalidar cache

    // Exemplo: Enviar email de boas-vindas
    await this.sendWelcomeEmail(event.user);

    // Exemplo: Registrar métrica
    await this.recordUserCreationMetric(event);
  }

  private async sendWelcomeEmail(user: {
    id: { toString: () => string };
    email: string;
  }): Promise<void> {
    // Simulação de envio de email
    logger.info({
      type: 'welcome_email_sent',
      userId: user.id.toString(),
      userEmail: user.email,
    });
  }

  private async recordUserCreationMetric(
    event: UserCreatedEvent,
  ): Promise<void> {
    // Simulação de registro de métrica
    logger.info({
      type: 'user_creation_metric',
      userId: event.user.id.toString(),
      userRole: event.user.role,
      timestamp: event.occurredAt.toISOString(),
    });
  }
}
