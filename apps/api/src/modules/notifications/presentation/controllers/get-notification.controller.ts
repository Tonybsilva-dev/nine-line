import { Request, Response } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';
import { logger } from '@/config/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getNotificationController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return ResponseMapper.error(
        res,
        400,
        'ID da notificação é obrigatório',
        'MISSING_NOTIFICATION_ID',
        {},
        req.requestId,
      );
    }

    const notification = await prisma.notification.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
            type: true,
            subject: true,
          },
        },
      },
    });

    if (!notification) {
      return ResponseMapper.error(
        res,
        404,
        'Notificação não encontrada',
        'NOTIFICATION_NOT_FOUND',
        { id },
        req.requestId,
      );
    }

    logger.info({
      type: 'notification_retrieved',
      notificationId: id,
      userId: notification.userId,
      status: notification.status,
    });

    return ResponseMapper.ok(
      res,
      {
        data: notification,
      },
      req.requestId,
    );
  } catch (error) {
    logger.error({
      type: 'get_notification_controller_error',
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
