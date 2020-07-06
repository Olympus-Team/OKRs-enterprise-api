import { Injectable } from '@nestjs/common';
import { RoleEntity } from '@app/db/entities/role.entity';
import { RoleRepository } from './role.repository';
import { RoleDTO } from './role.dto';
import { ObjectLiteral } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  public getListRole(): Promise<RoleEntity[]> {
    return this.roleRepository.getList();
  }

  public createRole(data: RoleDTO): Promise<RoleEntity> {
    return this.roleRepository.createRole(data);
  }

  public getRoleDetail(id: number): Promise<RoleEntity> {
    return this.roleRepository.getRoleDetail(id);
  }

  public updateRole(id: number, data: Partial<RoleDTO>): Promise<RoleEntity> {
    return this.roleRepository.updateRole(id, data);
  }

  public deleteRole(id: number): Promise<ObjectLiteral> {
    return this.roleRepository.deleteRole(id);
  }
}
