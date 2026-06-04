import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { env } from '../env/env';

export const createAuth = (prisma: PrismaService) =>
  betterAuth({
    database: prismaAdapter(prisma, { provider: 'postgresql' }), // Make it coherent with your schema file
    appName: env.APP_NAME,
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_BASE_URL,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      revokeSessionsOnPasswordReset: true,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      //   Auto Rotation if user is active
      updateAge: 60 * 40 * 24,
      //   Anti violation session
      freshAge: 60 * 60 * 2,
    },
    advanced: {
      crossSubDomainCookies: {
        enabled: true,
        domain: '.gabrielgourcerol.com',
      },
    },
    rateLimit: {
      enabled: true,
      window: 60,
      max: 100,
    },
    trustedOrigins: env.FRONTEND_URLS,
  });
