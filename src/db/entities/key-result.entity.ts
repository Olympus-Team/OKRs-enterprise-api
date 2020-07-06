import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.KeyResult)
export class KeyResultEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public startValue: number;

  @Column()
  public valueObtained: number;

  @Column()
  public targetValue: number;

  @Column()
  public content: string;

  @Column()
  public progress: number;

  @Column()
  public links: string;

  @Column()
  public objectiveId: number;

  @Column()
  public measureUnitId: number;
}
