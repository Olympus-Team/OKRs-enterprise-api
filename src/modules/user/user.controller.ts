import { Controller, Post, Body, UsePipes, Put, Param } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';

import { UserEntity } from '@app/db/entities/user.entity';
import { ValidationPipe } from '@app/core/pipes/validation.pipe';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth/signup')
  @UsePipes(new ValidationPipe())
  private signup(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.userService.signUp(user);
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe())
  private resetPassword(@Body() user: ResetPasswordDTO): Promise<ObjectLiteral> {
    return this.userService.resetPassword(user);
  }

  @Put('change-password/:id')
  @UsePipes(new ValidationPipe())
  private changePassword(@Param('id') id: number, @Body() user: ChangePasswordDTO): Promise<ObjectLiteral> {
    return this.userService.changePassword(id, user);
  }
}
