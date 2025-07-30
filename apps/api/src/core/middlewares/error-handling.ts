import { Request, Response, NextFunction } from 'express';
import { errorLogger } from '../../config/logger';
import { ErrorMapper } from '../errors/error-mapper';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  // Log error with structured information
  errorLogger.error({
    type: 'application_error',
    error: err instanceof Error ? err.message : 'Unknown error',
    stack: err instanceof Error ? err.stack : undefined,
    method: req.method,
    url: req.url,
    requestId: req.requestId,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: (req as any).user?.id,
    body: req.body,
    query: req.query,
    headers: {
      'user-agent': req.get('User-Agent'),
      'content-type': req.get('Content-Type'),
    },
  });

  // Use the new error mapper for consistent error responses
  const { statusCode, body } = ErrorMapper.toHTTPResponse(err);
  return res.status(statusCode).json(body);
}
