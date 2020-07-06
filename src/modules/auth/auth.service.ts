import { Injectable, InternalServerErrorException, HttpException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { SignInDTO, RegisterDTO } from './auth.dto';
import { AuthResponse } from './auth.interface';
import { EX_EMAIL_EXISTS, EX_INVALID_CREDENTIALS } from '@app/constants/app.exeption';
import { _salt } from '@app/constants/app.config';
import { hashSync } from 'bcryptjs';
import { JwtStrategy } from './jwt.strategy';
@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtStrategy: JwtStrategy) {}

  public async signIn({ email, password }: SignInDTO): Promise<AuthResponse> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        throw new UnauthorizedException(EX_INVALID_CREDENTIALS.message);
      }
      const token = await this.jwtStrategy.createBearerToken(user);
      return {
        ...user.toJSON(),
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(EX_INVALID_CREDENTIALS.message);
    }
  }

  async register(credentials: RegisterDTO): Promise<AuthResponse> {
    try {
      const { email } = credentials;
      const user = await this.userRepository.findOne({ where: { email } });
      if (user) {
        throw new HttpException(EX_EMAIL_EXISTS.message, EX_EMAIL_EXISTS.errorCode);
      }
      const newUser = this.userRepository.create(credentials);
      newUser.password = hashSync(newUser.password, _salt);
      const token = await this.jwtStrategy.createBearerToken(newUser);
      await this.userRepository.save(newUser);
      return {
        ...newUser.toJSON(),
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
