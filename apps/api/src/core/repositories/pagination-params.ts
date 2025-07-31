import { z } from 'zod';

export interface PaginationParams {
  page?: number;
  perPage?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export function toPrismaPagination({
  page = 1,
  perPage = 10,
  orderBy,
  orderDirection,
}: PaginationParams) {
  return {
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: {
      [orderBy ?? 'createdAt']: orderDirection ?? 'desc',
    },
  };
}

// Schema Zod padronizado para paginação
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .refine((val) => val > 0, 'page deve ser maior que 0'),
  perPage: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 10))
    .refine((val) => val > 0 && val <= 100, 'perPage deve estar entre 1 e 100'),
  orderBy: z
    .string()
    .optional()
    .transform((val) => (val ? val : undefined)),
  orderDirection: z
    .enum(['asc', 'desc'], {
      errorMap: () => ({ message: 'orderDirection deve ser asc ou desc' }),
    })
    .optional()
    .transform((val) => (val ? val : 'desc')),
});

export type PaginationInput = {
  page: number;
  perPage: number;
  orderBy?: string;
  orderDirection: 'asc' | 'desc';
};
