import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_BASE_URL: z.url(),
  APP_NAME: z.string(),
  PORT: z.coerce.number().default(3333),
  SWAGGER_USER: z.string(),
  SWAGGER_PASSWORD: z.string(),
  FRONTEND_URLS: z.string().transform((s) => s.split(',').map((s) => s.trim())),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => {
      const field = issue.path.join('.') || 'unknown';
      return `  - ${field}: ${issue.message}`;
    })
    .join('\n');

  throw new Error(`Environment validation failed:\n${details}`);
}

export const env = parsed.data;
