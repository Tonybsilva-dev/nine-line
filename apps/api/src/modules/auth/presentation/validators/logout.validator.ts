import { baseValidator } from '@/core/validators/';
import { z } from 'zod';

const logoutSchema = z.object({
  refreshToken: z
    .string()
    .min(10, 'Refresh token é obrigatório')
    .max(500, 'Refresh token deve ter no máximo 500 caracteres'),
});

export const validateLogout = baseValidator(logoutSchema, 'body');
