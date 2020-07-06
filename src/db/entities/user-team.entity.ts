import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.UserTeam)
export class UserTeamEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public isLeader: boolean;

  @Column()
  public userId: number;

  @Column()
  public teamId: number;
}
