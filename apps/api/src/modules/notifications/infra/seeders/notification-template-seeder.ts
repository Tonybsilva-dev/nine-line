import { NotificationTemplate } from '@/modules/notifications/domain/entities/notification-template';
import { NotificationTemplateRepository } from '@/modules/notifications/domain/repositories/notification-template-repository';
import { logger } from '@/config/logger';

export class NotificationTemplateSeeder {
  constructor(private templateRepository: NotificationTemplateRepository) {}

  async seed(): Promise<void> {
    logger.info({
      type: 'notification_template_seeder_started',
    });

    const templates = [
      {
        name: 'welcome-email',
        type: 'EMAIL' as const,
        subject: 'Bem-vindo ao 9line Spaces!',
        body: await this.loadTemplate('welcome'),
        variables: ['userName', 'userEmail', 'appUrl'],
        isActive: true,
      },
      {
        name: 'appointment-pending-approval',
        type: 'EMAIL' as const,
        subject: 'Novo Agendamento Pendente',
        body: await this.loadTemplate('appointment-pending'),
        variables: [
          'appointmentId',
          'spaceTitle',
          'userName',
          'appointmentDate',
          'startTime',
          'endTime',
          'adminUrl',
        ],
        isActive: true,
      },
      {
        name: 'appointment-approved',
        type: 'EMAIL' as const,
        subject: 'Agendamento Aprovado!',
        body: await this.loadTemplate('appointment-approved'),
        variables: [
          'appointmentId',
          'spaceTitle',
          'userName',
          'appointmentDate',
          'startTime',
          'endTime',
          'appUrl',
        ],
        isActive: true,
      },
      {
        name: 'appointment-approved-host',
        type: 'EMAIL' as const,
        subject: 'Agendamento Aprovado - Confirmação',
        body: await this.loadTemplate('appointment-approved-host'),
        variables: [
          'appointmentId',
          'spaceTitle',
          'userName',
          'appointmentDate',
          'startTime',
          'endTime',
          'approvedBy',
          'adminUrl',
        ],
        isActive: true,
      },
      {
        name: 'appointment-cancelled',
        type: 'EMAIL' as const,
        subject: 'Agendamento Cancelado',
        body: await this.loadTemplate('appointment-cancelled'),
        variables: [
          'appointmentId',
          'spaceTitle',
          'userName',
          'appointmentDate',
          'startTime',
          'endTime',
          'cancellationReason',
          'appUrl',
        ],
        isActive: true,
      },
    ];

    for (const templateData of templates) {
      try {
        const existingTemplate = await this.templateRepository.findByName(
          templateData.name,
        );

        if (existingTemplate) {
          logger.info({
            type: 'notification_template_already_exists',
            templateName: templateData.name,
          });
          continue;
        }

        const template = NotificationTemplate.create(templateData);
        await this.templateRepository.create(template);

        logger.info({
          type: 'notification_template_created',
          templateName: templateData.name,
          templateId: template.id.toString(),
        });
      } catch (error) {
        logger.error({
          type: 'notification_template_creation_error',
          templateName: templateData.name,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    logger.info({
      type: 'notification_template_seeder_completed',
    });
  }

  private async loadTemplate(templateName: string): Promise<string> {
    // Em uma implementação real, você carregaria o template do arquivo
    // Por enquanto, vamos retornar um template básico
    const templates: Record<string, string> = {
      welcome: `
        <h1>Bem-vindo ao 9line Spaces!</h1>
        <p>Olá {{userName}}!</p>
        <p>Seja muito bem-vindo ao 9line Spaces, a plataforma que conecta pessoas a espaços incríveis!</p>
        <p>Seu cadastro foi realizado com sucesso usando o email: <strong>{{userEmail}}</strong></p>
        <p>Comece agora mesmo a descobrir espaços incríveis perto de você!</p>
        <a href="{{appUrl}}">Explorar Espaços</a>
      `,
      'appointment-pending': `
        <h1>Novo Agendamento Pendente</h1>
        <p>Você recebeu uma nova solicitação de agendamento que requer sua aprovação.</p>
        <p><strong>Espaço:</strong> {{spaceTitle}}</p>
        <p><strong>Usuário:</strong> {{userName}}</p>
        <p><strong>Data:</strong> {{appointmentDate}}</p>
        <p><strong>Horário:</strong> {{startTime}} - {{endTime}}</p>
        <a href="{{adminUrl}}/appointments/{{appointmentId}}">Ver Detalhes</a>
      `,
      'appointment-approved': `
        <h1>Agendamento Aprovado!</h1>
        <p>Parabéns, {{userName}}!</p>
        <p>Seu agendamento foi aprovado com sucesso!</p>
        <p><strong>Espaço:</strong> {{spaceTitle}}</p>
        <p><strong>Data:</strong> {{appointmentDate}}</p>
        <p><strong>Horário:</strong> {{startTime}} - {{endTime}}</p>
        <a href="{{appUrl}}/appointments/{{appointmentId}}">Ver Detalhes</a>
      `,
      'appointment-approved-host': `
        <h1>Agendamento Aprovado - Confirmação</h1>
        <p>Você aprovou com sucesso um agendamento para seu espaço.</p>
        <p><strong>Espaço:</strong> {{spaceTitle}}</p>
        <p><strong>Usuário:</strong> {{userName}}</p>
        <p><strong>Data:</strong> {{appointmentDate}}</p>
        <p><strong>Horário:</strong> {{startTime}} - {{endTime}}</p>
        <p><strong>Aprovado por:</strong> {{approvedBy}}</p>
        <a href="{{adminUrl}}/appointments/{{appointmentId}}">Ver Detalhes</a>
      `,
      'appointment-cancelled': `
        <h1>Agendamento Cancelado</h1>
        <p>Olá, {{userName}}!</p>
        <p>Informamos que seu agendamento foi cancelado.</p>
        <p><strong>Espaço:</strong> {{spaceTitle}}</p>
        <p><strong>Data:</strong> {{appointmentDate}}</p>
        <p><strong>Horário:</strong> {{startTime}} - {{endTime}}</p>
        {{#if cancellationReason}}
        <p><strong>Motivo do Cancelamento:</strong> {{cancellationReason}}</p>
        {{/if}}
        <a href="{{appUrl}}/spaces">Agendar Novo Espaço</a>
      `,
    };

    return templates[templateName] || 'Template não encontrado';
  }
}
