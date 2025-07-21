import { Request, Response } from 'express';
import { logger, performanceLogger } from '../../config/logger';
import { prisma } from '../../config/prisma';
import { redisManager } from '@/config/redis';

export async function healthCheck(req: Request, res: Response) {
  const startTime = Date.now();

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    // Check Redis connection
    const redisConnected = await redisManager.ping();

    const duration = Date.now() - startTime;

    // Log health check
    logger.info({
      type: 'health_check',
      status: 'healthy',
      duration,
      timestamp: new Date().toISOString(),
    });

    // Log performance if slow
    if (duration > 500) {
      performanceLogger.warn({
        type: 'slow_health_check',
        duration,
        threshold: 500,
      });
    }

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      duration,
      services: {
        database: 'connected',
        redis: redisConnected ? 'connected' : 'disconnected',
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    // Log health check failure
    logger.error({
      type: 'health_check',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      duration,
      timestamp: new Date().toISOString(),
    });

    res.status(503).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }
}
