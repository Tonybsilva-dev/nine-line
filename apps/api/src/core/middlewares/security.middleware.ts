import { Request, Response, NextFunction, Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import express from 'express';
import { ENV_CONFIG } from '@/config/env';
import { helmetOptions } from '@/config/helmet.config';
import { corsOptions } from '@/config/cors.config';

export const securityMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.removeHeader('X-Powered-By');
    res.removeHeader('Server');

    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'geolocation=(), microphone=(), camera=()',
    );

    const contentLength = parseInt(req.headers['content-length'] || '0');
    const maxSize = 10 * 1024 * 1024;

    if (contentLength > maxSize) {
      return res.status(413).json({
        success: false,
        error: 'Payload too large',
        message: 'Request body exceeds maximum allowed size',
      });
    }

    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const contentType = req.headers['content-type'];
      if (!contentType || !contentType.includes('application/json')) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Content-Type',
          message: 'Content-Type must be application/json',
        });
      }
    }

    const clientIP = req.ip || req.connection.remoteAddress;
    if (clientIP) {
      if (req.path.includes('/auth') && req.method === 'POST') {
        console.log(`Auth attempt from IP: ${clientIP}`);
      }
    }

    next();
  };
};

export const validateOrigin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const origin = req.headers.origin;
  const allowedOrigins =
    ENV_CONFIG.NODE_ENV === 'production'
      ? [ENV_CONFIG.FRONTEND_URL, ENV_CONFIG.BACKOFFICE_URL].filter(Boolean)
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:3002',
        ];

  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'Origin not allowed',
    });
  }

  next();
};

export const applySecurityMiddleware = (app: Application) => {
  app.use(helmet(helmetOptions));
  app.use(cors(corsOptions));
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(securityMiddleware());
  app.use(validateOrigin);
};
