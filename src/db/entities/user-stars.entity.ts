import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.UserStar)
export class UserStarEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public accumulatedStar: number;

  @Column()
  public currentCycleStar: number;

  @Column()
  public userId: number;
}
