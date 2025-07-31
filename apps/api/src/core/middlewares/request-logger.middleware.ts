import { Request, Response, NextFunction, Application } from 'express';
import { requestLogger, performanceLogger } from '../../config/logger';

function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  req.requestId = requestId;

  requestLogger.info({
    type: 'request_start',
    method: req.method,
    url: req.url,
    requestId,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString(),
  });

  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    requestLogger.info({
      type: 'request_end',
      method: req.method,
      url: req.url,
      statusCode,
      duration,
      requestId,
      timestamp: new Date().toISOString(),
    });

    if (duration > 1000) {
      performanceLogger.warn({
        type: 'slow_request',
        method: req.method,
        url: req.url,
        duration,
        threshold: 1000,
        requestId,
      });
    }

    return originalSend.call(this, body);
  };

  next();
}

export const applyRequestLoggerMiddleware = (app: Application) => {
  app.use(requestLoggerMiddleware);
};
