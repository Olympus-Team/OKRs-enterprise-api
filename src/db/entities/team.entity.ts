import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { UserEntity } from './user.entity';
import { UserTeamEntity } from './user-team.entity';

@Entity(TableName.Teams)
export class TeamEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  // @OneToMany(
  //   () => UserTeamEntity,
  //   (usersTeams) => usersTeams.team,
  // )
  // usersTeams: UserTeamEntity[];
}
