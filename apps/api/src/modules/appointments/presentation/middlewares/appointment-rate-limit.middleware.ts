import { Request, Response, NextFunction } from 'express';
import { ResponseMapper } from '@/core/presentation/responses';
import { logger } from '@/config/logger';

// Rate limiting específico para operações de agendamentos
// Limita operações sensíveis como criação e aprovação
export const appointmentRateLimit = (
  maxRequests: number = 10,
  windowMs: number = 60000,
) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';

    const now = Date.now();
    const userRequests = requests.get(ip);

    if (!userRequests || now > userRequests.resetTime) {
      // Primeira requisição ou janela expirada
      requests.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (userRequests.count >= maxRequests) {
      logger.warn({
        type: 'appointment_rate_limit_exceeded',
        ip,
        maxRequests,
        windowMs,
        endpoint: req.path,
        method: req.method,
      });

      return ResponseMapper.error(
        res,
        429,
        'Too many appointment operations',
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
    requests.set(ip, userRequests);

    next();
  };
};
