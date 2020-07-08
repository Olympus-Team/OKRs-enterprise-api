import { ObjectLiteral } from 'typeorm';
import { Controller, Post, Body, UsePipes, Put, Param, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ResetPasswordDTO, ChangePasswordDTO } from './user.dto';
import { ValidationPipe } from '@app/shared/pipes/validation.pipe';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { CurrentUser } from './user.decorator';
import { UserEntity } from '@app/db/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthenticationGuard)
  public me(@CurrentUser() user: UserEntity): UserEntity {
    return user;
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe())
  public resetPassword(@Body() user: ResetPasswordDTO): Promise<void> {
    return this.userService.resetPassword(user);
  }

  @Put('change-password/:id')
  @UsePipes(new ValidationPipe())
  public changePassword(@Param('id') id: number, @Body() user: ChangePasswordDTO): Promise<ObjectLiteral> {
    return this.userService.changePassword(id, user);
  }

  @Put('reject-request/:id')
  @UsePipes(new ValidationPipe())
  public rejectRequest(@Param('id') id: number): Promise<ObjectLiteral> {
    return this.userService.rejectRequest(id);
  }
}
