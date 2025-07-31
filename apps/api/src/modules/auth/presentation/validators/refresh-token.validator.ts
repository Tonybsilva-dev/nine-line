import { baseValidator } from '@/core/validators/';
import { z } from 'zod';

const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(10, 'Refresh token deve ter pelo menos 10 caracteres')
    .max(500, 'Refresh token deve ter no máximo 500 caracteres'),
});

export const validateRefreshToken = baseValidator(refreshTokenSchema, 'body');
