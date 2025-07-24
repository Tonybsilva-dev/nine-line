import { PaginationParams } from '@/core/repositories/pagination-params';

declare global {
  namespace Express {
    interface Request {
      pagination?: PaginationParams;
      requestId?: string;
      startTime?: number;
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }
  }
}
