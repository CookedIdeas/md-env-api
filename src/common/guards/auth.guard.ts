import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AUTH_INSTANCE } from '../auth/auth';
import type { BetterAuth } from '../../better-auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_INSTANCE) private readonly auth: BetterAuth) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const headers = new Headers();
    const cookie = req.headers.cookie;
    if (cookie) headers.set('cookie', cookie);

    const session = await this.auth.api.getSession({ headers });

    if (!session?.user) {
      throw new UnauthorizedException();
    }

    (req as Request & { user: typeof session.user }).user = session.user;
    return true;
  }
}
