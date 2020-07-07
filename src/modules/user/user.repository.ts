import { Repository, EntityRepository, ObjectLiteral, FindOneOptions } from 'typeorm';

import { UserEntity } from '@app/db/entities/user.entity';
import { RegisterDTO } from '../auth/auth.dto';
import { TableName } from '@app/constants/app.enums';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async getList(): Promise<UserEntity[]> {
    return await this.find();
  }

  public async getUserByConditions(id?: number, options?: FindOneOptions): Promise<UserEntity> {
    return await this.findOne(id, options);
  }

  public async updateUserById(id: number, user: RegisterDTO): Promise<UserEntity> {
    await this.update({ id }, user);
    return this.getUserByConditions(id);
  }

  public async deleteUser(id: number): Promise<ObjectLiteral> {
    await this.delete({ id });
    return { isDeleted: true };
  }

  public async getAllUser(): Promise<UserEntity[]> {
    return this.createQueryBuilder(TableName.User)
      .leftJoinAndSelect(TableName.User + '.role', TableName.Role)
      .leftJoinAndSelect(TableName.User + '.jobPosition', TableName.JobPosition)
      .getMany();
  }
}
