import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { generate } from 'generate-password';
import { ObjectLiteral } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { _salt } from '@app/constants/app.config';
import { sendEmail } from '@app/services/email/sendEmail';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * @description Reset password and send mail for staff
   *
   */
  public async resetPassword(user: ResetPasswordDTO): Promise<ObjectLiteral> {
    const { email } = user;
    const currentUser = await this.userRepository.getUserByEmail(email);
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

    return this.userRepository.getUserByEmail(email);
  }

  public async changePassword(id: number, user: ChangePasswordDTO): Promise<ObjectLiteral> {
    const currentUser = await this.userRepository.getUserById(id);
    if (!currentUser) {
      throw new HttpException('User do not exist', HttpStatus.BAD_REQUEST);
    }
    user.password = hashSync(user.password, _salt);

    await this.userRepository.update({ id }, user);

    return this.userRepository.getUserById(id);
  }
}
