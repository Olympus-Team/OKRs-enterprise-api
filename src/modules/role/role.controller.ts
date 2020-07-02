import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './role.dto';
import { sendEmail } from '@app/services/email/sendEmail';
import { RoleEntity } from '@app/db/entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  private showAllRole(): any {
    sendEmail('ducpvse05320@fpt.edu.vn');
    return this.roleService.getListRole();
  }

  @Post()
  private createRole(@Body() role: RoleDTO): Promise<RoleEntity> {
    return this.roleService.createRole(role);
  }

  @Get(':id')
  private getDetailRole(@Param('id') id: number): Promise<RoleEntity> {
    return this.roleService.getRoleDetail(id);
  }

  @Put(':id')
  private updateRole(@Param('id') id: number, @Body() data: Partial<RoleDTO>): Promise<RoleEntity> {
    return this.roleService.updateRole(id, data);
  }

  @Delete(':id')
  private deleteRole(@Param('id') id: number): any {
    return this.roleService.deleteRole(id);
  }
}
