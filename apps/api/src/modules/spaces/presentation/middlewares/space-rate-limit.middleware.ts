import { sensitiveRateLimit } from '@/core/middlewares/rate-limit.middleware';

// Rate limiting específico para operações de espaços usando configuração centralizada
export const spaceRateLimit = sensitiveRateLimit;
