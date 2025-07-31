import { flexibleValidator } from '@/core/validators/';
import { paginationSchema } from '@/core/repositories/pagination-params';
import { z } from 'zod';

const findAllAppointmentsSchema = z
  .object({
    status: z
      .enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'], {
        errorMap: () => ({
          message: 'status deve ser PENDING, APPROVED, REJECTED ou CANCELLED',
        }),
      })
      .optional(),
    startDate: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
        'startDate deve estar no formato YYYY-MM-DD',
      ),
    endDate: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val),
        'endDate deve estar no formato YYYY-MM-DD',
      ),
  })
  .merge(paginationSchema);

export const validateFindAllAppointments = flexibleValidator(
  findAllAppointmentsSchema,
  'query',
);
