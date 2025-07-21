import { pino } from 'pino';
import { ENV_CONFIG } from './env.js';

const isDocker = ENV_CONFIG.DOCKER === 'true';

export const logger = pino({
  level:
    ENV_CONFIG.LOG_LEVEL ||
    (ENV_CONFIG.NODE_ENV === 'production' ? 'info' : 'debug'),
  base: {
    pid: process.pid,
    hostname: process.env.HOSTNAME || 'unknown',
    environment: ENV_CONFIG.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
  ...(isDocker
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            messageFormat: '{msg} [id={reqId}]',
            errorLikeObjectKeys: ['err', 'error'],
          },
        },
      }),
});

// Logger específico para requests
export const requestLogger = logger.child({ module: 'request' });

// Logger específico para erros
export const errorLogger = logger.child({ module: 'error' });

// Logger específico para performance
export const performanceLogger = logger.child({ module: 'performance' });
