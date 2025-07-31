import { sensitiveRateLimit } from '@/core/middlewares/rate-limit.middleware';

// Rate limiting específico para operações de agendamentos usando configuração centralizada
export const appointmentRateLimit = sensitiveRateLimit;
