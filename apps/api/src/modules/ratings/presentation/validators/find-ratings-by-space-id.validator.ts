import { flexibleValidator } from '@/core/validators/';
import { paginationSchema } from '@/core/repositories/pagination-params';
import { z } from 'zod';

const findRatingsBySpaceIdSchema = z
  .object({
    id: z
      .string()
      .min(1, 'ID do espaço é obrigatório')
      .regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
        'ID deve ser um UUID válido',
      ),
    rating: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : undefined))
      .refine(
        (val) => !val || (val >= 1 && val <= 5),
        'rating deve estar entre 1 e 5',
      ),
  })
  .merge(paginationSchema);

export const validateFindRatingsBySpaceId = flexibleValidator(
  findRatingsBySpaceIdSchema,
  'params',
);
