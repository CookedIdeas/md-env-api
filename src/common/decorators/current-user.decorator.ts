import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (
    _data: unknown,
    ctx: ExecutionContext,
  ): { id: string; email: string; name: string } => {
    const request = ctx.switchToHttp().getRequest<{
      user: { id: string; email: string; name: string };
    }>();
    return request.user;
  },
);
