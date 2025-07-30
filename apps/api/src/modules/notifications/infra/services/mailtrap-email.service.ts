import { MailtrapClient } from 'mailtrap';
import { ENV_CONFIG } from '@/config/env';
import { logger } from '@/config/logger';

export class MailtrapEmailService {
  private client: MailtrapClient;
  private sender: { name: string; email: string };

  constructor() {
    if (!ENV_CONFIG.MAILTRAP_TOKEN) {
      throw new Error('MAILTRAP_TOKEN is required for email service');
    }

    if (!ENV_CONFIG.MAILTRAP_SENDER_EMAIL) {
      throw new Error('MAILTRAP_SENDER_EMAIL is required for email service');
    }

    this.client = new MailtrapClient({ token: ENV_CONFIG.MAILTRAP_TOKEN });
    this.sender = {
      name: ENV_CONFIG.MAILTRAP_SENDER_NAME || ENV_CONFIG.MAILTRAP_FROM_NAME,
      email: ENV_CONFIG.MAILTRAP_SENDER_EMAIL,
    };
  }

  async sendEmail(params: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<void> {
    try {
      logger.info({
        type: 'email_sending',
        to: params.to,
        subject: params.subject,
      });

      await this.client.send({
        from: this.sender,
        to: [{ email: params.to }],
        subject: params.subject,
        text: params.text,
        html: params.html,
      });

      logger.info({
        type: 'email_sent',
        to: params.to,
        subject: params.subject,
      });
    } catch (error) {
      logger.error({
        type: 'email_send_error',
        to: params.to,
        subject: params.subject,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async sendTemplateEmail(params: {
    to: string;
    templateId: string;
    subject: string;
    variables: Record<string, string>;
  }): Promise<void> {
    try {
      // TODO: Implementar compilação de template com Handlebars
      const html = this.compileTemplate(params.templateId, params.variables);

      await this.sendEmail({
        to: params.to,
        subject: params.subject,
        html,
      });
    } catch (error) {
      logger.error({
        type: 'template_email_send_error',
        to: params.to,
        templateId: params.templateId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  private compileTemplate(
    templateId: string,
    variables: Record<string, string>,
  ): string {
    // TODO: Implementar compilação real de template
    // Por enquanto, retorna um template básico
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${variables.subject || '9line Spaces'}</title>
        </head>
        <body>
          <h1>9line Spaces</h1>
          <p>Template: ${templateId}</p>
          <p>Variáveis: ${JSON.stringify(variables)}</p>
        </body>
      </html>
    `;
  }
}
