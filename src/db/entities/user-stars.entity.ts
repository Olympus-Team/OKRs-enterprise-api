import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { UserEntity } from './user.entity';

@Entity(TableName.UserStar)
export class UserStarEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public star: number;

  @Column()
  public cycleId: number;

  @Column()
  public userId: number;

  public users: UserEntity;
}
