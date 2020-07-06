import { hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException, HttpException, UnauthorizedException } from '@nestjs/common';
import { _salt } from '@app/constants/app.config';
import { SignInDTO, RegisterDTO } from './auth.dto';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '@app/db/entities/user.entity';
import { AuthResponse, JwtPayload } from './auth.interface';
import { EX_EMAIL_EXISTS, EX_INVALID_CREDENTIALS } from '@app/constants/app.exeption';
@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  public async signIn({ email, password }: SignInDTO): Promise<AuthResponse> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        throw new UnauthorizedException(EX_INVALID_CREDENTIALS.message);
      }
      const token = await this.createBearerToken(user);
      return {
        ...user.toJSON(),
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(EX_INVALID_CREDENTIALS.message);
    }
  }

  public async register(credentials: RegisterDTO): Promise<AuthResponse> {
    try {
      const { email } = credentials;
      const user = await this.userRepository.findOne({ where: { email } });
      if (user) {
        throw new HttpException(EX_EMAIL_EXISTS.message, EX_EMAIL_EXISTS.errorCode);
      }
      const newUser = this.userRepository.create(credentials);
      newUser.password = hashSync(newUser.password, _salt);
      const token = await this.createBearerToken(newUser);
      await this.userRepository.save(newUser);
      return {
        ...newUser.toJSON(),
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async validateUserFromJwtPayload(payload: JwtPayload): Promise<UserEntity> {
    try {
      const { id } = payload;
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async createBearerToken(user: UserEntity): Promise<string> {
    const payload: JwtPayload = { id: user.id };
    const token = await this.jwtService.sign(payload);
    return `bearer ${token}`;
  }
}
