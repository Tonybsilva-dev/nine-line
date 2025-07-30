import nodemailer, { Transporter } from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '@/config/logger';

export interface EmailData {
  to: string;
  subject: string;
  templateName: string;
  data: Record<string, unknown>;
}

export class EmailService {
  private transporter: Transporter;
  private templatesPath: string;

  constructor() {
    this.templatesPath = path.join(__dirname, 'templates', 'email');

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(emailData: EmailData): Promise<void> {
    try {
      const template = await this.loadTemplate(emailData.templateName);
      const compiledTemplate = Handlebars.compile(template);
      const html = compiledTemplate(emailData.data);

      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@nineline.com',
        to: emailData.to,
        subject: emailData.subject,
        html,
      };

      await this.transporter.sendMail(mailOptions);

      logger.info({
        type: 'email_sent',
        to: emailData.to,
        subject: emailData.subject,
        template: emailData.templateName,
      });
    } catch (error) {
      logger.error({
        type: 'email_error',
        to: emailData.to,
        subject: emailData.subject,
        template: emailData.templateName,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  private async loadTemplate(templateName: string): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, `${templateName}.hbs`);
      return await fs.readFile(templatePath, 'utf-8');
    } catch (error) {
      logger.error({
        type: 'template_load_error',
        templateName,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw new Error(`Template ${templateName} not found`);
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      logger.error({
        type: 'email_connection_error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  }
}
