import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.Cycle)
export class CycleEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public startDate: Date;

  @Column()
  public endDate: Date;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
