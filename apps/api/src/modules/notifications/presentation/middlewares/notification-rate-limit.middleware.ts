import { criticalRateLimit } from '@/core/middlewares/rate-limit.middleware';

// Rate limiting específico para notificações usando configuração centralizada
export const notificationRateLimit = criticalRateLimit;
