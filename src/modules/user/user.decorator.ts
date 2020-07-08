import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): ParameterDecorator => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
