import { ENV_CONFIG } from './env.js';

export const corsOptions = {
  origin:
    ENV_CONFIG.NODE_ENV === 'production'
      ? [ENV_CONFIG.FRONTEND_URL, ENV_CONFIG.BACKOFFICE_URL].filter(Boolean)
      : [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://localhost:3002',
        ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400,
};
