import { Request, Response, NextFunction } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';
import { logger } from '@/config/logger';
import { ENV_CONFIG } from '@/config/env';

export const createRateLimit = (
  maxRequests: number = ENV_CONFIG.RATE_LIMIT_MAX_REQUESTS,
  windowMs: number = ENV_CONFIG.RATE_LIMIT_WINDOW_MS,
  operationType: string = 'default',
) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';

    const now = Date.now();
    const userRequests = requests.get(ip);

    if (!userRequests || now > userRequests.resetTime) {
      requests.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (userRequests.count >= maxRequests) {
      logger.warn({
        type: 'rate_limit_exceeded',
        operationType,
        ip,
        maxRequests,
        windowMs,
        endpoint: req.path,
        method: req.method,
      });

      return ResponseMapper.error(
        res,
        429,
        'Too many requests',
        'RATE_LIMIT_EXCEEDED',
        {
          maxRequests,
          windowMs,
          retryAfter: Math.ceil((userRequests.resetTime - now) / 1000),
          operationType,
        },
        req.requestId,
      );
    }

    userRequests.count++;
    requests.set(ip, userRequests);

    next();
  };
};

export const smartRateLimit = () => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const path = req.path;
    const method = req.method;

    // Detectar tipo de operação baseado no path e method
    let operationType = 'standard';
    let maxRequests = ENV_CONFIG.RATE_LIMIT_MAX_REQUESTS;
    const windowMs = ENV_CONFIG.RATE_LIMIT_WINDOW_MS;

    // Operações críticas (auth, rbac, notificações)
    if (
      path.includes('/auth') ||
      path.includes('/rbac') ||
      path.includes('/notifications')
    ) {
      operationType = 'critical';
      maxRequests = ENV_CONFIG.RATE_LIMIT_CRITICAL_MAX_REQUESTS;
    }
    // Operações sensíveis (usuários, espaços, agendamentos, avaliações)
    else if (
      path.includes('/users') ||
      path.includes('/spaces') ||
      path.includes('/appointments') ||
      path.includes('/ratings')
    ) {
      operationType = 'sensitive';
      maxRequests = ENV_CONFIG.RATE_LIMIT_SENSITIVE_MAX_REQUESTS;
    }

    // Ajustar baseado no método HTTP
    if (method === 'DELETE') {
      maxRequests = Math.floor(maxRequests * 0.5); // 50% menos para deletes
    } else if (method === 'PUT' || method === 'PATCH') {
      maxRequests = Math.floor(maxRequests * 0.7); // 70% para updates
    }

    const now = Date.now();
    const userRequests = requests.get(ip);

    if (!userRequests || now > userRequests.resetTime) {
      requests.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (userRequests.count >= maxRequests) {
      logger.warn({
        type: 'smart_rate_limit_exceeded',
        operationType,
        ip,
        maxRequests,
        windowMs,
        endpoint: req.path,
        method: req.method,
      });

      return ResponseMapper.error(
        res,
        429,
        'Too many requests',
        'RATE_LIMIT_EXCEEDED',
        {
          maxRequests,
          windowMs,
          retryAfter: Math.ceil((userRequests.resetTime - now) / 1000),
          operationType,
        },
        req.requestId,
      );
    }

    userRequests.count++;
    requests.set(ip, userRequests);

    next();
  };
};

export const standardRateLimit = createRateLimit(
  ENV_CONFIG.RATE_LIMIT_MAX_REQUESTS,
  ENV_CONFIG.RATE_LIMIT_WINDOW_MS,
  'standard',
);

export const sensitiveRateLimit = createRateLimit(
  ENV_CONFIG.RATE_LIMIT_SENSITIVE_MAX_REQUESTS,
  ENV_CONFIG.RATE_LIMIT_WINDOW_MS,
  'sensitive',
);

export const criticalRateLimit = createRateLimit(
  ENV_CONFIG.RATE_LIMIT_CRITICAL_MAX_REQUESTS,
  ENV_CONFIG.RATE_LIMIT_WINDOW_MS,
  'critical',
);
