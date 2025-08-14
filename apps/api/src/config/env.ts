import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  DOCKER: z.string().default('false'),
  LOG_LEVEL: z
    .enum(['debug', 'fatal', 'error', 'warn', 'info', 'trace'])
    .default('info'),
  JWT_SECRET: z.string().optional().default('your-jwt-secret'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string().optional().default('your-jwt-refresh-secret'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),
  BCRYPT_SALT_ROUNDS: z.string().transform(Number).default('12'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  RATE_LIMIT_SENSITIVE_MAX_REQUESTS: z.string().transform(Number).default('50'),
  RATE_LIMIT_CRITICAL_MAX_REQUESTS: z.string().transform(Number).default('20'),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  BACKOFFICE_URL: z.string().default('http://localhost:3001'),
  APP_URL: z.string().default('http://localhost:3333'),
  ANDROID_APP_URL: z
    .string()
    .default('https://play.google.com/store/apps/details?id=com.nineline.app'),
  IOS_APP_URL: z
    .string()
    .default('https://apps.apple.com/app/nine-line/id123456789'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: z.string().transform(Boolean).default('false'),
  MAILTRAP_HOST: z.string().default('sandbox.smtp.mailtrap.io'),
  MAILTRAP_PORT: z.coerce.number().default(587),
  MAILTRAP_USER: z.string().optional(),
  MAILTRAP_PASS: z.string().optional(),
  MAILTRAP_FROM: z.string().default('noreply@nine-line.com'),
  MAILTRAP_FROM_NAME: z.string().default('9line Spaces'),
  MAILTRAP_TOKEN: z.string().optional(),
  MAILTRAP_SENDER_EMAIL: z.string().optional(),
  MAILTRAP_SENDER_NAME: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
});

export const ENV_CONFIG = envSchema.parse(process.env);
