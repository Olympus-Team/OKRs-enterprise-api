import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { generate } from 'generate-password';
import { ObjectLiteral, Connection } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { _salt } from '@app/constants/app.config';
import { httpEmailExists } from '@app/constants/app.exeption';
import { sendEmail } from '@app/services/email/sendEmail';
import { ResetPasswordDTO, ChangePasswordDTO } from './user.dto';
import { UserEntity } from '@app/db/entities/user.entity';
import { RegisterDTO } from '../auth/auth.dto';
import { RoleEntity } from '@app/db/entities/role.entity';

@Injectable()
export class UserService {
  constructor(private connection: Connection, private _userRepository: UserRepository) {
    this._userRepository = connection.getCustomRepository(UserRepository);
  }

  public async createUser({ email, password, fullName }: Partial<RegisterDTO>): Promise<UserEntity> {
    try {
      const emailExists = await this._userRepository.findUserByEmail(email);
      if (emailExists) {
        throw new HttpException(httpEmailExists.message, httpEmailExists.errorCode);
      }
      const newUser = this._userRepository.create({ email, password, fullName, _salt });
      await this._userRepository.save(newUser);
      delete newUser.password;
      return newUser;
    } catch (error) {
      throw new HttpException(httpEmailExists.message, httpEmailExists.errorCode);
    }
  }

  /**
   * @description Reset password and send mail for staff
   *
   */
  public async resetPassword(user: ResetPasswordDTO): Promise<void> {
    const { email } = user;
    const currentUser = await this._userRepository.getUserByConditions(null, { where: { email } });
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
    await this._userRepository.update({ email }, user);
    sendEmail(email, newPassword);
  }

  public async changePassword(id: number, user: ChangePasswordDTO): Promise<ObjectLiteral> {
    const currentUser = await this._userRepository.getUserByConditions(id);
    if (!currentUser) {
      throw new HttpException('User do not exist', HttpStatus.BAD_REQUEST);
    }
    user.password = hashSync(user.password, _salt);

    await this._userRepository.update({ id }, user);

    return this._userRepository.getUserByConditions(id);
  }

  public async rejectRequest(id: number): Promise<ObjectLiteral> {
    return await this._userRepository.delete({ id });
  }

  public async getUsers(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
    return await paginate<UserEntity>(this._userRepository, options);
  }

  public async getUserDetail(id: number): Promise<UserEntity> {
    return await this._userRepository.getUserDetail(id);
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return await this._userRepository.getUserByConditions(null, {
      where: {
        email,
      },
    });
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return await this._userRepository.getUserByConditions(id);
  }

  public async getRoleByUserID(id: number): Promise<RoleEntity> {
    const userRole = await this._userRepository.getUserRole(id);
    return userRole.role;
  }
}
