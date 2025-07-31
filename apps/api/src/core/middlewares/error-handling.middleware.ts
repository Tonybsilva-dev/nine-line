import { Request, Response } from 'express';
import { errorLogger } from '../../config/logger';
import { ErrorMapper } from '../errors/error-mapper';

export function errorHandler(err: unknown, req: Request, res: Response) {
  errorLogger.error({
    type: 'application_error',
    error: err instanceof Error ? err.message : 'Unknown error',
    stack: err instanceof Error ? err.stack : undefined,
    method: req.method,
    url: req.url,
    requestId: req.requestId,
    userId: req.user?.id,
    body: req.body,
    query: req.query,
    headers: {
      'user-agent': req.get('User-Agent'),
      'content-type': req.get('Content-Type'),
    },
  });

  const { statusCode, body } = ErrorMapper.toHTTPResponse(err);
  return res.status(statusCode).json(body);
}
