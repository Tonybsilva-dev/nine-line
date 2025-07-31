import { baseValidator } from '@/core/validators/';
import { z } from 'zod';

const rejectAppointmentSchema = z.object({
  id: z
    .string()
    .min(1, 'ID do agendamento é obrigatório')
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'ID deve ser um UUID válido',
    ),
});

export const validateRejectAppointment = baseValidator(
  rejectAppointmentSchema,
  'params',
);
