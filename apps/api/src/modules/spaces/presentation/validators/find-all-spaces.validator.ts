import { flexibleValidator } from '@/core/validators/';
import { paginationSchema } from '@/core/repositories/pagination-params';
import { z } from 'zod';

const findAllSpacesSchema = z
  .object({
    search: z
      .string()
      .optional()
      .transform((val) => (val ? val : undefined)),
    category: z
      .string()
      .optional()
      .transform((val) => (val ? val : undefined)),
    priceMin: z
      .string()
      .optional()
      .transform((val) => (val ? parseFloat(val) : undefined))
      .refine(
        (val) => !val || val >= 0,
        'priceMin deve ser maior ou igual a 0',
      ),
    priceMax: z
      .string()
      .optional()
      .transform((val) => (val ? parseFloat(val) : undefined))
      .refine(
        (val) => !val || val >= 0,
        'priceMax deve ser maior ou igual a 0',
      ),
    available: z
      .string()
      .optional()
      .transform((val) => (val ? val === 'true' : true))
      .refine(
        (val) => typeof val === 'boolean',
        'available deve ser true ou false',
      ),
  })
  .merge(paginationSchema);

export const validateFindAllSpaces = flexibleValidator(
  findAllSpacesSchema,
  'query',
);
