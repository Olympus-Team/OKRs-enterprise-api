import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { ApiUnsupportedMediaTypeResponse } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Entity(TableName.JobPosition)
export class JobEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  @OneToMany((type) => UserEntity, (user) => user.jobPosition)
  users: UserEntity[];
}
