import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  DOCKER: z.string().default('false'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
});

export const ENV_CONFIG = envSchema.parse(process.env);
