import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { UserEntity } from './user.entity';

@Entity(TableName.JobPosition)
export class JobEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @OneToMany(() => UserEntity, (user) => user.jobPosition)
  public users: UserEntity[];
}
