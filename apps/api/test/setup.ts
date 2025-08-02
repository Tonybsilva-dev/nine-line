process.env.NODE_ENV = 'test';
process.env.APP_PORT = '3333';

process.env.JWT_SECRET =
  process.env.JWT_SECRET || 'test-jwt-secret-key-for-testing-only';
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  'test-jwt-refresh-secret-key-for-testing-only';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
process.env.REFRESH_TOKEN_EXPIRES_IN =
  process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

process.env.BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || '10';

process.env.RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || '60000';
process.env.RATE_LIMIT_MAX_REQUESTS =
  process.env.RATE_LIMIT_MAX_REQUESTS || '100';
process.env.RATE_LIMIT_SENSITIVE_MAX_REQUESTS =
  process.env.RATE_LIMIT_SENSITIVE_MAX_REQUESTS || '10';
process.env.RATE_LIMIT_CRITICAL_MAX_REQUESTS =
  process.env.RATE_LIMIT_CRITICAL_MAX_REQUESTS || '5';

process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'localhost:3000';
process.env.BACKOFFICE_URL = process.env.BACKOFFICE_URL || 'localhost:3001';
process.env.APP_URL = process.env.APP_URL || 'localhost:3000';

process.env.DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db';

process.env.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

process.env.SMTP_HOST = process.env.SMTP_HOST || 'smtp.test.com';
process.env.SMTP_PORT = process.env.SMTP_PORT || '587';
process.env.SMTP_USER = process.env.SMTP_USER || 'test';
process.env.SMTP_PASS = process.env.SMTP_PASS || 'test';
process.env.SMTP_SECURE = process.env.SMTP_SECURE || 'false';

process.env.SENTRY_DSN =
  process.env.SENTRY_DSN || 'https://test@sentry.io/test';

process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'error';
