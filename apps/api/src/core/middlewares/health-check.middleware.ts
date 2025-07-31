import { Request, Response } from 'express';
import { prisma } from '@/config/prisma';
import { redisManager } from '@/config/redis.config';

export function healthCheck(req: Request, res: Response) {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: 'unknown',
      redis: 'unknown',
    },
  };

  const checkDatabase = async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return 'OK';
    } catch (error) {
      console.error('Database health check failed:', error);
      return 'ERROR';
    }
  };

  const checkRedis = async () => {
    try {
      const isConnected = redisManager.isRedisConnected();
      if (!isConnected) {
        return 'ERROR';
      }

      const pingResult = await redisManager.ping();
      return pingResult ? 'OK' : 'ERROR';
    } catch (error) {
      console.error('Redis health check failed:', error);
      return 'ERROR';
    }
  };

  Promise.all([checkDatabase(), checkRedis()])
    .then(([dbStatus, redisStatus]) => {
      health.services.database = dbStatus;
      health.services.redis = redisStatus;

      const allServicesHealthy =
        health.services.database === 'OK' && health.services.redis === 'OK';

      res.status(allServicesHealthy ? 200 : 503).json(health);
    })
    .catch((error) => {
      health.status = 'ERROR';
      health.services.database = 'ERROR';
      health.services.redis = 'ERROR';

      res.status(503).json({
        ...health,
        error: error.message,
      });
    });
}
