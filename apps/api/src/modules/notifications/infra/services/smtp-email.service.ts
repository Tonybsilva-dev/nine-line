import nodemailer from 'nodemailer';
import { ENV_CONFIG } from '@/config/env';
import { logger } from '@/config/logger';
import { PrismaClient } from '@prisma/client';

export class SmtpEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    if (!ENV_CONFIG.MAILTRAP_USER || !ENV_CONFIG.MAILTRAP_PASS) {
      throw new Error(
        'MAILTRAP_USER and MAILTRAP_PASS are required for email service',
      );
    }

    this.transporter = nodemailer.createTransport({
      host: ENV_CONFIG.MAILTRAP_HOST,
      port: ENV_CONFIG.MAILTRAP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: ENV_CONFIG.MAILTRAP_USER,
        pass: ENV_CONFIG.MAILTRAP_PASS,
      },
      // Configurações específicas para Mailtrap
      tls: {
        rejectUnauthorized: false,
      },
    });
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

      const mailOptions = {
        from: `"${ENV_CONFIG.MAILTRAP_FROM_NAME}" <${ENV_CONFIG.MAILTRAP_FROM}>`,
        to: params.to,
        subject: params.subject,
        text: params.text,
        html: params.html,
        attachments: [
          {
            filename: 'nine-line-spaces.png',
            path: './assets/nine-line-spaces.png',
            cid: 'nine-line-spaces',
          },
        ],
      };

      const info = await this.transporter.sendMail(mailOptions);

      logger.info({
        type: 'email_sent',
        to: params.to,
        subject: params.subject,
        messageId: info.messageId,
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
      const html = await this.compileTemplate(
        params.templateId,
        params.variables,
      );

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

  private async compileTemplate(
    templateId: string,
    variables: Record<string, string>,
  ): Promise<string> {
    const prisma = new PrismaClient();

    try {
      // Buscar o template do banco de dados
      const template = await prisma.notificationTemplate.findUnique({
        where: { id: templateId },
        select: { body: true, name: true },
      });

      if (!template) {
        throw new Error(`Template não encontrado: ${templateId}`);
      }

      logger.info({
        type: 'template_compilation',
        templateId,
        templateName: template.name,
        variablesCount: Object.keys(variables).length,
      });

      // Substituir as variáveis no template
      let compiledHtml = template.body;

      // Substituir variáveis no formato {{variableName}}
      for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        compiledHtml = compiledHtml.replace(regex, value);
      }

      // Processar condicionais Handlebars simples {{#if variable}}...{{/if}}
      const conditionalRegex = /{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g;
      compiledHtml = compiledHtml.replace(
        conditionalRegex,
        (match, variableName, content) => {
          const variableValue = variables[variableName];
          if (variableValue && variableValue.trim() !== '') {
            return content;
          }
          return '';
        },
      );

      // Log das variáveis substituídas
      logger.info({
        type: 'template_variables_substituted',
        templateId,
        templateName: template.name,
        variables: Object.keys(variables),
      });

      return compiledHtml;
    } catch (error) {
      logger.error({
        type: 'template_compilation_error',
        templateId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
