import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { generate } from 'generate-password';
import { ObjectLiteral } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { _salt } from '@app/constants/app.config';
import { sendEmail } from '@app/services/email/sendEmail';
import { ResetPasswordDTO, ChangePasswordDTO, UpdateUserDTO } from './user.dto';
import { UserEntity } from '@app/db/entities/user.entity';
import { UserTeamRepository } from './user-team.repository';
import { UserTeamDTO } from './user-team.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private userTeamRepository: UserTeamRepository) {}

  /**
   * @description Reset password and send mail for staff
   *
   */
  public async resetPassword(user: ResetPasswordDTO): Promise<void> {
    const { email } = user;
    const currentUser = await this.userRepository.getUserByConditions(null, { where: { email } });
    if (!currentUser) {
      throw new HttpException('Email do not exist', HttpStatus.BAD_REQUEST);
    }

    const newPassword = generate({
      length: 10,
      numbers: true,
      lowercase: true,
      uppercase: true,
    });

    user.password = hashSync(newPassword, _salt);
    await this.userRepository.update({ email }, user);
    sendEmail(email, newPassword);
  }

  public async changePassword(id: number, user: ChangePasswordDTO): Promise<ObjectLiteral> {
    const currentUser = await this.userRepository.getUserByConditions(id);
    if (!currentUser) {
      throw new HttpException('User do not exist', HttpStatus.BAD_REQUEST);
    }
    user.password = hashSync(user.password, _salt);

    await this.userRepository.update({ id }, user);

    return this.userRepository.getUserByConditions(id);
  }

  /**
   * Author: QuangNV
   * Reject Request
   */
  public async rejectRequest(id: number): Promise<ObjectLiteral> {
    return await this.userRepository.delete({ id });
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.getUsers();
  }

  public async getUserDetail(id: number): Promise<UserEntity[]> {
    return await this.userRepository.getUserDetail(id);
  }

  public async updateUserInfor(id: number, data: UpdateUserDTO): Promise<ObjectLiteral> {
    this.userRepository.update({ id }, data);
    console.log('HIHI:' + data.userTeam);
    if (data.userTeam) {
      this.userTeamRepository.update({ id }, data.userTeam);
    }
    return { hihi: true };
  }
}
