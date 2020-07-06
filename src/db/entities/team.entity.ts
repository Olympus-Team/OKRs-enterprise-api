import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.Team)
export class TeamEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
