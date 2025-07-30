import { Request, Response } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';
import { logger } from '@/config/logger';
import { PrismaClient } from '@prisma/client';
import { SmtpEmailService } from '../../infra/services/smtp-email.service';
import { ENV_CONFIG } from '@/config/env';

const prisma = new PrismaClient();

export async function sendNotificationController(req: Request, res: Response) {
  try {
    const { userId, type, templateId } = req.body;

    // Validar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return ResponseMapper.error(
        res,
        404,
        'Usuário não encontrado',
        'USER_NOT_FOUND',
        { userId },
        req.requestId,
      );
    }

    // Validar se o template existe
    const template = await prisma.notificationTemplate.findUnique({
      where: { id: templateId },
      select: { id: true, name: true, type: true, subject: true },
    });

    if (!template) {
      return ResponseMapper.error(
        res,
        404,
        'Template de notificação não encontrado',
        'TEMPLATE_NOT_FOUND',
        { templateId },
        req.requestId,
      );
    }

    // Validar se o tipo de notificação é válido
    const validTypes = ['EMAIL', 'SMS', 'PUSH'];
    if (!validTypes.includes(type)) {
      return ResponseMapper.error(
        res,
        400,
        'Tipo de notificação inválido',
        'INVALID_NOTIFICATION_TYPE',
        { type, validTypes },
        req.requestId,
      );
    }

    // Criar registro da notificação
    const notification = await prisma.notification.create({
      data: {
        userId: user.id,
        type: type,
        templateId: template.id,
        status: 'PENDING',
        payload: {
          userName: user.name,
          userEmail: user.email,
          templateName: template.name,
          appUrl: ENV_CONFIG.APP_URL,
          androidAppUrl: ENV_CONFIG.ANDROID_APP_URL,
          iosAppUrl: ENV_CONFIG.IOS_APP_URL,
          ...req.body.payload,
        },
      },
    });

    // Enviar email via SMTP
    const emailService = new SmtpEmailService();

    try {
      await emailService.sendTemplateEmail({
        to: user.email,
        templateId: template.id,
        subject: template.subject || 'Notificação Nine Line',
        variables: {
          userName: user.name,
          userEmail: user.email,
          templateName: template.name,
          appUrl: ENV_CONFIG.APP_URL,
          // Variáveis específicas para appointment-pending-approval
          managerName: req.body.payload?.managerName || 'Administrador',
          siteName: req.body.payload?.siteName || 'Nine Line',
          spaceTitle: req.body.payload?.spaceTitle || '',
          startDate: req.body.payload?.startDate || '',
          endDate: req.body.payload?.endDate || '',
          guestCount: req.body.payload?.guestCount || '',
          additionalNotes: req.body.payload?.additionalNotes || '',
          approveUrl: req.body.payload?.approveUrl || '',
          rejectUrl: req.body.payload?.rejectUrl || '',
          siteUrl: req.body.payload?.siteUrl || ENV_CONFIG.APP_URL,
          supportEmail:
            req.body.payload?.supportEmail || 'suporte@nine-line.com',
          supportPhone: req.body.payload?.supportPhone || '(11) 99999-9999',
          // Variáveis específicas para appointment-cancelled
          cancellationReason: req.body.payload?.cancellationReason || '',
          // Variáveis específicas para appointment-approved-host
          approvedBy: req.body.payload?.approvedBy || '',
          adminUrl: req.body.payload?.adminUrl || ENV_CONFIG.APP_URL,
          // Variáveis específicas para outros templates
          appointmentId: req.body.payload?.appointmentId || '',
          appointmentDate: req.body.payload?.appointmentDate || '',
          startTime: req.body.payload?.startTime || '',
          endTime: req.body.payload?.endTime || '',
          // Spread do payload por último para permitir sobrescrever valores padrão
          ...req.body.payload,
        },
      });

      // Atualizar status para SENT
      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
        },
      });

      logger.info({
        type: 'notification_sent_via_api',
        notificationId: notification.id,
        userId,
        userName: user.name,
        userEmail: user.email,
        notificationType: type,
        templateId,
        templateName: template.name,
      });
    } catch (error) {
      // Atualizar status para FAILED
      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw error;
    }

    return ResponseMapper.created(
      res,
      {
        message: 'Notificação enviada com sucesso',
        data: {
          userId,
          userName: user.name,
          userEmail: user.email,
          type,
          templateId,
          templateName: template.name,
        },
      },
      req.requestId,
    );
  } catch (error) {
    logger.error({
      type: 'send_notification_controller_error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return ResponseMapper.error(
      res,
      500,
      'Internal server error',
      'INTERNAL_ERROR',
      { error: error instanceof Error ? error.message : 'Unknown error' },
      req.requestId,
    );
  } finally {
    await prisma.$disconnect();
  }
}
