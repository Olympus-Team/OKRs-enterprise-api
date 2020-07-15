import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { defaultJwtModuleOption } from '@app/constants/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from './token.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: defaultJwtModuleOption.secret,
      signOptions: {
        expiresIn: defaultJwtModuleOption.expiresIn,
      },
    }),
    UserModule,
    TypeOrmModule.forFeature([TokenRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
