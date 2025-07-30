import { baseValidator } from '@/core/validators/';
import { z } from 'zod';

const sendNotificationSchema = z.object({
  userId: z
    .string()
    .min(1, 'userId é obrigatório')
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'userId deve ser um UUID válido',
    ),
  type: z.enum(['EMAIL', 'SMS', 'PUSH'], {
    errorMap: () => ({ message: 'type deve ser EMAIL, SMS ou PUSH' }),
  }),
  templateId: z
    .string()
    .min(1, 'templateId é obrigatório')
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      'templateId deve ser um UUID válido',
    ),
  payload: z.record(z.unknown()).optional(),
});

export const validateSendNotification = baseValidator(
  sendNotificationSchema,
  'body',
);
