import { ObjectLiteral } from 'typeorm';
import { Controller, Post, Body, UsePipes, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '@app/core/pipes/validation.pipe';
import { ResetPasswordDTO, ChangePasswordDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('reset-password')
  @UsePipes(new ValidationPipe())
  private resetPassword(@Body() user: ResetPasswordDTO): Promise<void> {
    return this.userService.resetPassword(user);
  }

  @Put('change-password/:id')
  @UsePipes(new ValidationPipe())
  private changePassword(@Param('id') id: number, @Body() user: ChangePasswordDTO): Promise<ObjectLiteral> {
    return this.userService.changePassword(id, user);
  }
}
