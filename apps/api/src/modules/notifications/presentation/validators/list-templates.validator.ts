import { flexibleValidator } from '@/core/validators/';
import { paginationSchema } from '@/core/repositories/pagination-params';
import { z } from 'zod';

const listTemplatesSchema = z
  .object({
    type: z
      .enum(['EMAIL', 'SMS', 'PUSH'], {
        errorMap: () => ({ message: 'type deve ser EMAIL, SMS ou PUSH' }),
      })
      .optional(),
  })
  .merge(paginationSchema);

export const validateListTemplates = flexibleValidator(
  listTemplatesSchema,
  'query',
);
