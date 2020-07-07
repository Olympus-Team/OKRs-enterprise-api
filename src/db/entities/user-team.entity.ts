import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, ManyToOne } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { UserEntity } from './user.entity';
import { TeamEntity } from './team.entity';

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

  // @ManyToOne(
  //   () => UserEntity,
  //   (user: UserEntity) => user.usersTeams,
  // )
  // user: UserEntity;

  // @ManyToOne(
  //   () => TeamEntity,
  //   (team) => team.usersTeams,
  // )
  // team: TeamEntity;
}
