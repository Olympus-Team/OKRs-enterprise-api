import { Repository, EntityRepository, ObjectLiteral } from 'typeorm';
import { RoleEntity } from '@app/db/entities/role.entity';
import { RoleDTO } from './role.dto';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {
  public async getList(): Promise<RoleEntity[]> {
    return await this.find();
  }

  public async createRole(data: RoleDTO): Promise<RoleEntity> {
    const newRole = await this.save(data);

    return newRole;
  }

  public async getRoleDetail(id: number): Promise<RoleEntity> {
    return await this.findOne({ where: { id } });
  }

  public async updateRole(id: number, data: Partial<RoleDTO>): Promise<RoleEntity> {
    await this.update({ id }, data);
    return await this.findOne({ id });
  }

  public async deleteRole(id: number): Promise<ObjectLiteral> {
    await this.delete({ id });
    return { isDeleted: true };
  }

  public hihi(): string {
    return 'asfsdfsfsdf';
  }
}
