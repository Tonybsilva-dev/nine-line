import { Request, Response, NextFunction } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';
import { logger } from '@/config/logger';

// Rate limiting específico para notificações
// Limita o envio de notificações por usuário
export const notificationRateLimit = (
  maxRequests: number = 10,
  windowMs: number = 60000,
) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return ResponseMapper.error(
        res,
        400,
        'User ID is required for rate limiting',
        'MISSING_USER_ID',
        {},
        req.requestId,
      );
    }

    const now = Date.now();
    const userRequests = requests.get(userId);

    if (!userRequests || now > userRequests.resetTime) {
      // Primeira requisição ou janela expirada
      requests.set(userId, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (userRequests.count >= maxRequests) {
      logger.warn({
        type: 'notification_rate_limit_exceeded',
        userId,
        maxRequests,
        windowMs,
      });

      return ResponseMapper.error(
        res,
        429,
        'Too many notification requests',
        'RATE_LIMIT_EXCEEDED',
        {
          maxRequests,
          windowMs,
          retryAfter: Math.ceil((userRequests.resetTime - now) / 1000),
        },
        req.requestId,
      );
    }

    // Incrementar contador
    userRequests.count++;
    requests.set(userId, userRequests);

    next();
  };
};
