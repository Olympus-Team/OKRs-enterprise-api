import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '@app/db/entities/user.entity';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  // public canActivate(context: ExecutionContext) {
  //   // Add your custom authentication logic here
  //   // for example, call super.logIn(request) to establish a session.
  //   return super.canActivate(context);
  // }
  public handleRequest<T = UserEntity>(err: Error, user?: T): T {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
