import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import accessEnv from '@app/libs/accessEnv';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  private jwtSecret: string = accessEnv('JWT_SECRET');
  private expiresIn: number = accessEnv('JWT_TOKEN_EXPIRES_IN');

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.jwtSecret,
      signOptions: {
        expiresIn: this.expiresIn,
      },
    };
  }
}
