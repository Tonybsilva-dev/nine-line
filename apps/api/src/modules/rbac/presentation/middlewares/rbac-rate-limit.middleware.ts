import { criticalRateLimit } from '@/core/middlewares/rate-limit.middleware';

// Rate limiting específico para operações de RBAC usando configuração centralizada
export const rbacRateLimit = criticalRateLimit;
