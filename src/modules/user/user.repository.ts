import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '@app/db/entities/user.entity';
import { RegisterDto } from '../auth/auth.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async getList(): Promise<UserEntity[]> {
    return await this.find();
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return await this.findOne({ where: { id } });
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }

  public async updateUserById(id: number, user: RegisterDto): Promise<UserEntity> {
    await this.update({ id }, user);
    return this.getUserById(id);
  }
}
