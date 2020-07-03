import { Repository, EntityRepository, FindOneOptions } from 'typeorm';
import { UserEntity } from '@app/db/entities/user.entity';
import { RegisterDTO } from '../auth/auth.dto';

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
}
