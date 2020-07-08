import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException } from '@nestjs/common';
import accessEnv from '@app/libs/accessEnv';
import { AuthService } from './auth.service';
import { JwtPayload } from './auth.interface';
import { EX_UNAUTHORIZED } from '@app/constants/app.exeption';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessEnv('JWT_SECRET'),
    });
  }

  public async validate(payload: any | JwtPayload, done: VerifiedCallback): Promise<void> {
    const user = await this.authService.validateUserFromJwtPayload(payload);
    if (!user) {
      return done(new HttpException(EX_UNAUTHORIZED.message, EX_UNAUTHORIZED.statusCode));
    }
    return done(null, user, payload.iat);
  }
}
