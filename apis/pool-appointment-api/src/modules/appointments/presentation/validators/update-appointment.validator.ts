import { baseValidator } from '@/core/validators';
import { z } from 'zod';
import { AppointmentStatus } from '@prisma/client';

const updateAppointmentSchema = z
  .object({
    date: z.string().datetime().optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
    status: z.nativeEnum(AppointmentStatus).optional(),
    cancelReason: z.string().min(1, 'Cancel reason is required').optional(),
  })
  .refine(
    (data) => {
      if (data.status === 'CANCELLED') {
        return !!data.cancelReason;
      }
      return true;
    },
    {
      message: 'Cancel reason is required when cancelling an appointment',
      path: ['cancelReason'],
    },
  );

export const validateUpdateAppointment = baseValidator(
  updateAppointmentSchema,
  'body',
);
