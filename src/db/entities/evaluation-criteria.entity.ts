import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.EvaluationCriteria)
export class EvaluationCriteriaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column()
  public numberOfStar: number;

  @Column()
  public type: string;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
