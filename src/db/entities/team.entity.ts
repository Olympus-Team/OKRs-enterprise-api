import { PrimaryGeneratedColumn, Column, Entity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { UserTeamEntity } from './user-team.entity';
@Entity(TableName.Team)
export class TeamEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @OneToMany(() => UserTeamEntity, (userTeam) => userTeam.team)
  public userToTeams: UserTeamEntity[];
}
