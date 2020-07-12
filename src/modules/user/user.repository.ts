import { Repository, EntityRepository, ObjectLiteral, FindOneOptions } from 'typeorm';
import { UserEntity } from '@app/db/entities/user.entity';
import { RegisterDTO } from '../auth/auth.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async getList(): Promise<UserEntity[]> {
    return await this.find();
  }

  public async getUserByConditions(id?: number, options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.findOneOrFail(id, options);
  }

  public async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }

  public async updateUserById(id: number, user: RegisterDTO): Promise<UserEntity> {
    await this.update({ id }, user);
    return this.getUserByConditions(id);
  }

  public async deleteUser(id: number): Promise<ObjectLiteral> {
    try {
      const rowEffected: number = await (await this.delete({ id })).affected;
      return { isDeleted: rowEffected === 1 ? true : false };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.find({
      relations: ['role', 'jobPosition', 'userToTeams', 'userToTeams.team'],
    });
  }

  public async getUserDetail(id: number): Promise<UserEntity> {
    return await this.findOneOrFail({
      relations: ['role', 'jobPosition', 'userToTeams', 'userToTeams.team'],
      where: { id },
    });
  }

  public async getUserRole(id: number): Promise<UserEntity> {
    return await this.findOneOrFail({
      relations: ['role'],
      where: { id },
    });
  }
}
