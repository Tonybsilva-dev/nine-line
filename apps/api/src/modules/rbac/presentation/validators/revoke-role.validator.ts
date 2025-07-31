import { baseValidator } from '@/core/validators/';
import { z } from 'zod';

const revokeRoleSchema = z.object({
  userId: z
    .string()
    .min(1, 'User ID é obrigatório')
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'User ID deve ser um UUID válido',
    ),
  roleId: z
    .string()
    .min(1, 'Role ID é obrigatório')
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'Role ID deve ser um UUID válido',
    ),
  revokedBy: z
    .string()
    .min(1, 'Revoked By é obrigatório')
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'Revoked By deve ser um UUID válido',
    ),
});

export const validateRevokeRole = baseValidator(revokeRoleSchema, 'body');
