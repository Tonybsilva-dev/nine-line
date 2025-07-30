import { Request, Response } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';
import { logger } from '@/config/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listNotificationsController(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10, userId, status, type } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Construir filtros
    const whereClause: Record<string, string> = {};

    if (userId) {
      whereClause.userId = userId as string;
    }

    if (status) {
      whereClause.status = status as string;
    }

    if (type) {
      whereClause.type = type as string;
    }

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where: whereClause,
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
            },
          },
        },
        skip,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({
        where: whereClause,
      }),
    ]);

    logger.info({
      type: 'notifications_listed',
      page: pageNumber,
      limit: limitNumber,
      total,
      filters: { userId, status, type },
    });

    return ResponseMapper.ok(
      res,
      {
        data: notifications,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total,
          totalPages: Math.ceil(total / limitNumber),
        },
      },
      req.requestId,
    );
  } catch (error) {
    logger.error({
      type: 'list_notifications_controller_error',
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
