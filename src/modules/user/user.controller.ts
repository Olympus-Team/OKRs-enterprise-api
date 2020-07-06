import { ObjectLiteral } from 'typeorm';
import { Controller, Post, Body, UsePipes, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ResetPasswordDTO, ChangePasswordDTO } from './user.dto';
import { ValidationPipe } from '@app/shared/pipes/validation.pipe';

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

  @Put('reject-request/:id')
  @UsePipes(new ValidationPipe())
  private rejectRequest(@Param('id') id: number): Promise<ObjectLiteral> {
    return this.userService.rejectRequest(id);
  }
}
