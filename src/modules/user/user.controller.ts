import { ObjectLiteral } from 'typeorm';
import { Controller, Post, Body, UsePipes, Put, Param, Get, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ResetPasswordDTO, ChangePasswordDTO } from './user.dto';
import { ValidationPipe } from '@app/shared/pipes/validation.pipe';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { CurrentUser } from './user.decorator';
import { UserEntity } from '@app/db/entities/user.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('/api/v1/users')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  public async index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Pagination<UserEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this._userService.getUsers({
      page,
      limit,
    });
  }

  @Get(':id')
  public async getUserDetail(@Param('id') id: number): Promise<UserEntity> {
    return this._userService.getUserById(id);
  }

  @Get('me')
  @UseGuards(AuthenticationGuard)
  public async me(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe())
  public async resetPassword(@Body() user: ResetPasswordDTO): Promise<void> {
    return this._userService.resetPassword(user);
  }

  @Put('/me/change-password/:id')
  @UsePipes(new ValidationPipe())
  public async changePassword(@Param('id') id: number, @Body() user: ChangePasswordDTO): Promise<ObjectLiteral> {
    return this._userService.changePassword(id, user);
  }

  @Put('reject-request/:id')
  @UsePipes(new ValidationPipe())
  public async rejectRequest(@Param('id') id: number): Promise<ObjectLiteral> {
    return this._userService.rejectRequest(id);
  }
}
