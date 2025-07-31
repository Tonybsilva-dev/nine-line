import { flexibleValidator } from '@/core/validators/';
import { paginationSchema } from '@/core/repositories/pagination-params';
import { z } from 'zod';

const findAppointmentsByUserIdSchema = z
  .object({
    id: z
      .string()
      .min(1, 'ID do usuário é obrigatório')
      .regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        'ID deve ser um UUID válido',
      ),
    status: z
      .enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'], {
        errorMap: () => ({
          message: 'status deve ser PENDING, APPROVED, REJECTED ou CANCELLED',
        }),
      })
      .optional(),
  })
  .merge(paginationSchema);

export const validateFindAppointmentsByUserId = flexibleValidator(
  findAppointmentsByUserIdSchema,
  'params',
);
