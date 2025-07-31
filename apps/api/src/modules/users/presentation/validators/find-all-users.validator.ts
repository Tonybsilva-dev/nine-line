import { flexibleValidator } from '@/core/validators/';
import { paginationSchema } from '@/core/repositories/pagination-params';
import { z } from 'zod';

const findAllUsersSchema = z
  .object({
    search: z
      .string()
      .optional()
      .transform((val) => (val ? val : undefined)),
    status: z
      .enum(['ACTIVE', 'INACTIVE'], {
        errorMap: () => ({ message: 'status deve ser ACTIVE ou INACTIVE' }),
      })
      .optional(),
    role: z
      .enum(['ADMIN', 'USER', 'HOST'], {
        errorMap: () => ({ message: 'role deve ser ADMIN, USER ou HOST' }),
      })
      .optional(),
  })
  .merge(paginationSchema);

export const validateFindAllUsers = flexibleValidator(
  findAllUsersSchema,
  'query',
);
