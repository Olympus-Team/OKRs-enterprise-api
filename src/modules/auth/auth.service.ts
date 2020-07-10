import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SignInDTO } from './auth.dto';
import { UserEntity } from '@app/db/entities/user.entity';
import { AuthResponse, JwtPayload } from './auth.interface';
import { invalidCredential } from '@app/constants/app.exeption';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  public async authenticate({ email, password }: SignInDTO): Promise<AuthResponse> {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new BadRequestException();
      }
      if (!user.comparePassword(password)) {
        throw new BadRequestException(invalidCredential);
      }
      return await this.createBearerToken(user);
    } catch (error) {
      throw new UnauthorizedException(invalidCredential);
    }
  }

  public async validateUserFromJwtPayload(payload: JwtPayload): Promise<UserEntity | null> {
    try {
      const { id } = payload;
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async createBearerToken(user: UserEntity): Promise<AuthResponse> {
    const token = await this.jwtService.sign({ id: user.id });
    return { token };
  }
}
