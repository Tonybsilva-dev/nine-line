import { logger } from '../../config/logger';
import { prisma } from '@/config/prisma';
import { redisManager } from '@/config/redis.config';
import { Server } from 'http';

export function setupGracefulShutdown(server: Server) {
  const gracefulShutdown = async (signal: string) => {
    logger.info({
      type: 'graceful_shutdown',
      signal,
      message: `Received ${signal}. Starting graceful shutdown...`,
    });

    server.close((err: Error | undefined) => {
      if (err) {
        logger.error({
          type: 'graceful_shutdown_error',
          error: err.message,
          signal,
        });
        process.exit(1);
      }

      logger.info({
        type: 'graceful_shutdown',
        message: 'HTTP server closed',
        signal,
      });

      prisma
        .$disconnect()
        .then(() => {
          logger.info({
            type: 'graceful_shutdown',
            message: 'Database connections closed',
            signal,
          });
        })
        .catch((error: Error) => {
          logger.error({
            type: 'graceful_shutdown_error',
            error: error.message,
            message: 'Error closing database connections',
            signal,
          });
        });

      try {
        const redisClient = redisManager.getClient();
        if (redisClient) {
          redisClient.disconnect();
        }
        logger.info({
          type: 'graceful_shutdown',
          message: 'Redis connections closed',
          signal,
        });
      } catch (error) {
        logger.error({
          type: 'graceful_shutdown_error',
          error: error instanceof Error ? error.message : 'Unknown error',
          message: 'Error closing Redis connections',
          signal,
        });
      }

      setTimeout(() => {
        logger.info({
          type: 'graceful_shutdown',
          message: 'Process exiting',
          signal,
        });
        process.exit(0);
      }, 1000);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  process.on('uncaughtException', (error) => {
    logger.fatal({
      type: 'uncaught_exception',
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.fatal({
      type: 'unhandled_rejection',
      reason: reason instanceof Error ? reason.message : String(reason),
      promise: promise.toString(),
    });
    process.exit(1);
  });
}
