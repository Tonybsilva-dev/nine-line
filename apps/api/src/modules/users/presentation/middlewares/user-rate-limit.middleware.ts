import { sensitiveRateLimit } from '@/core/middlewares/rate-limit.middleware';

// Rate limiting específico para operações de usuários usando configuração centralizada
export const userRateLimit = sensitiveRateLimit;
