import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import accessEnv from '@app/libs/accessEnv';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '@app/db/entities/user.entity';
import { JwtPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessEnv('JWT_SECRET'),
    });
  }

  // public async validate(payload: JwtPayload): Promise<UserEntity> {
  //   const { email } = payload;
  //   const user = await this.userRepository.findOne({ where: { email } });
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  public async createBearerToken(user: UserEntity): Promise<string> {
    const payload: JwtPayload = { id: user.id };
    const token = await this.jwtService.sign(payload);
    return `Bearer ${token}`;
  }
}
