import { Request, Response, NextFunction } from 'express';
import { requestLogger, performanceLogger } from '../../config/logger';

export function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Generate unique request ID
  req.requestId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  req.startTime = Date.now();

  // Log request start
  requestLogger.info({
    type: 'request_start',
    method: req.method,
    url: req.url,
    path: req.path,
    query: req.query,
    headers: {
      'user-agent': req.get('User-Agent'),
      'content-type': req.get('Content-Type'),
      authorization: req.get('Authorization') ? '[PRESENT]' : '[MISSING]',
    },
    ip: req.ip || req.connection.remoteAddress,
    requestId: req.requestId,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: (req as any).user?.id,
  });

  // Override res.end to log response
  const originalEnd = res.end;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.end = function (chunk?: any, encoding?: any) {
    const duration = Date.now() - (req.startTime || 0);

    // Log request completion
    requestLogger.info({
      type: 'request_end',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      requestId: req.requestId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (req as any).user?.id,
      responseSize: chunk ? Buffer.byteLength(chunk, encoding) : 0,
    });

    // Log performance metrics for slow requests
    if (duration > 1000) {
      performanceLogger.warn({
        type: 'slow_request',
        method: req.method,
        url: req.url,
        duration,
        requestId: req.requestId,
        threshold: 1000,
      });
    }

    // Log errors
    if (res.statusCode >= 400) {
      requestLogger.error({
        type: 'request_error',
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration,
        requestId: req.requestId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (req as any).user?.id,
      });
    }

    return originalEnd.call(this, chunk, encoding);
  };

  next();
}
