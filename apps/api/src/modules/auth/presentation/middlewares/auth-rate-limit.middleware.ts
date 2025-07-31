import { criticalRateLimit } from '@/core/middlewares/rate-limit.middleware';

// Rate limiting específico para operações de autenticação usando configuração centralizada
export const authRateLimit = criticalRateLimit;
