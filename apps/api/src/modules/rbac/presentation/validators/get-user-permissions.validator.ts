import { baseValidator } from '@/core/validators/';
import { z } from 'zod';

const getUserPermissionsSchema = z.object({
  userId: z
    .string()
    .min(1, 'User ID é obrigatório')
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'User ID deve ser um UUID válido',
    ),
});

export const validateGetUserPermissions = baseValidator(
  getUserPermissionsSchema,
  'params',
);
