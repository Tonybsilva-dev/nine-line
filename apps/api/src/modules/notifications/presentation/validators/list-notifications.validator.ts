import { flexibleValidator } from '@/core/validators/';
import { paginationSchema } from '@/core/repositories/pagination-params';
import { z } from 'zod';

const listNotificationsSchema = z
  .object({
    userId: z
      .string()
      .optional()
      .transform((val) => (val ? val : undefined))
      .refine(
        (val) =>
          !val ||
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
            val,
          ),
        'userId deve ser um UUID válido',
      ),
    status: z
      .enum(['PENDING', 'SENT', 'FAILED'], {
        errorMap: () => ({
          message: 'status deve ser PENDING, SENT ou FAILED',
        }),
      })
      .optional(),
    type: z
      .enum(['EMAIL', 'SMS', 'PUSH'], {
        errorMap: () => ({ message: 'type deve ser EMAIL, SMS ou PUSH' }),
      })
      .optional(),
  })
  .merge(paginationSchema);

export const validateListNotifications = flexibleValidator(
  listNotificationsSchema,
  'query',
);
