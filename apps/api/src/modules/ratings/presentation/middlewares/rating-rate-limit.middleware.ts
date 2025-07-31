import { sensitiveRateLimit } from '@/core/middlewares/rate-limit.middleware';

// Rate limiting específico para operações de avaliações usando configuração centralizada
export const ratingRateLimit = sensitiveRateLimit;
