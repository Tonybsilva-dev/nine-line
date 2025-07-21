import { Request, Response } from 'express';
import { ResponseMapper } from '../responses/response-mapper';
import { PaginationParams } from '@/core/repositories/pagination-params';

export abstract class BaseController {
  protected requestId(req: Request): string | undefined {
    return req.requestId;
  }

  protected ok<T>(res: Response, data: T, req?: Request): Response {
    return ResponseMapper.ok(res, data, req?.requestId);
  }

  protected created<T>(res: Response, data: T, req?: Request): Response {
    return ResponseMapper.created(res, data, req?.requestId);
  }

  protected noContent(res: Response, req?: Request): Response {
    return ResponseMapper.noContent(res, req?.requestId);
  }

  protected paginated<T>(
    res: Response,
    items: T[],
    paginationParams: PaginationParams,
    total: number,
    req?: Request,
  ): Response {
    return ResponseMapper.paginated(
      res,
      items,
      paginationParams,
      total,
      req?.requestId,
    );
  }

  protected error(
    res: Response,
    statusCode: number,
    message: string,
    code: string,
    details?: Record<string, unknown>,
    req?: Request,
  ): Response {
    return ResponseMapper.error(
      res,
      statusCode,
      message,
      code,
      details,
      req?.requestId,
    );
  }

  protected handleError(
    res: Response,
    error: unknown,
    req?: Request,
  ): Response {
    if (error instanceof Error) {
      return this.error(
        res,
        400,
        error.message,
        'BUSINESS_ERROR',
        undefined,
        req,
      );
    }

    return this.error(
      res,
      500,
      'Internal server error',
      'INTERNAL_ERROR',
      undefined,
      req,
    );
  }
}
