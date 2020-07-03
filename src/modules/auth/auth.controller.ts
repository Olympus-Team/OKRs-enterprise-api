import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDTO, SignInDTO } from './auth.dto';
import { AuthResponse } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: RegisterDTO })
  async register(@Body(ValidationPipe) credentials: RegisterDTO): Promise<AuthResponse> {
    return await this.authService.register(credentials);
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: SignInDTO })
  async signIn(@Body('user', ValidationPipe) credentials: SignInDTO): Promise<AuthResponse> {
    return await this.authService.signIn(credentials);
  }
}
