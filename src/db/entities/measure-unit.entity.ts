import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.MeasureUnit)
export class MeasureUnitEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public preset: string;

  @Column()
  public type: string;

  @Column()
  public index: number;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
