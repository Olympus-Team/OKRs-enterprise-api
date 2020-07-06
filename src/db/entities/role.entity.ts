import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TableName, RoleEnum } from '@app/constants/app.enums';

@Entity(TableName.Role)
export class RoleEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ enum: [RoleEnum.ADMIN, RoleEnum.HR, RoleEnum.TEAM_LEADER, RoleEnum.STAFF] })
  public name: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
