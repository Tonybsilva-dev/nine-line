import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  DOCKER: z.string().default('false'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3333'),

  // Notification settings
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),

  // Mailtrap SMTP settings
  MAILTRAP_HOST: z.string().default('sandbox.smtp.mailtrap.io'),
  MAILTRAP_PORT: z.coerce.number().default(587),
  MAILTRAP_USER: z.string(),
  MAILTRAP_PASS: z.string(),
  MAILTRAP_FROM: z.string().default('noreply@nine-line.com'),
  MAILTRAP_FROM_NAME: z.string().default('Nine Line'),

  // Mailtrap API settings (para MailtrapEmailService)
  MAILTRAP_TOKEN: z.string().optional(),
  MAILTRAP_SENDER_EMAIL: z.string().optional(),
  MAILTRAP_SENDER_NAME: z.string().optional(),

  // App URLs
  APP_URL: z.string().default('http://localhost:3000'),
  ANDROID_APP_URL: z
    .string()
    .default('https://play.google.com/store/apps/details?id=com.nineline.app'),
  IOS_APP_URL: z
    .string()
    .default('https://apps.apple.com/app/nine-line/id123456789'),
  ADMIN_URL: z.string().default('http://localhost:3000/admin'),
});

export const ENV_CONFIG = envSchema.parse(process.env);
