import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDTO, SignInDTO } from './auth.dto';
import { AuthResponse } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ description: 'User Registration' })
  public async register(@Body(ValidationPipe) credentials: RegisterDTO): Promise<AuthResponse> {
    return await this.authService.register(credentials);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'Sign In with credentials' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  public async signIn(@Body('user', ValidationPipe) credentials: SignInDTO): Promise<AuthResponse> {
    return await this.authService.signIn(credentials);
  }
}
