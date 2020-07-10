import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './auth.interface';
import { httpUnauthorized } from '@app/constants/app.exeption';
import { UserEntity } from '@app/db/entities/user.entity';
import { defaultJwtModuleOption } from '@app/constants/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: defaultJwtModuleOption.secret,
    });
  }

  public async validate(payload: any | JwtPayload): Promise<UserEntity> {
    const user = await this.authService.validateUserFromJwtPayload(payload);
    if (!user) {
      throw new HttpException(httpUnauthorized.message, httpUnauthorized.statusCode);
    }
    return user;
  }
}
