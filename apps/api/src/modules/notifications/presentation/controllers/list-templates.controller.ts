import { Request, Response } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';
import { logger } from '@/config/logger';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listTemplatesController(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Buscar templates do banco de dados
    let whereClause = {};
    if (type) {
      whereClause = { type: type as string };
    }

    const [templates, total] = await Promise.all([
      prisma.notificationTemplate.findMany({
        where: whereClause,
        skip,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notificationTemplate.count({
        where: whereClause,
      }),
    ]);

    logger.info({
      type: 'notification_templates_listed',
      page: pageNumber,
      limit: limitNumber,
      total,
    });

    return res.status(200).json({
      success: true,
      data: {
        templates,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total,
          totalPages: Math.ceil(total / limitNumber),
        },
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: req.requestId,
        version: '1.0.0',
      },
    });
  } catch (error) {
    logger.error({
      type: 'list_templates_controller_error',
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
