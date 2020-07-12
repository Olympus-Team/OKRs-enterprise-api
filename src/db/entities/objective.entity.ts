import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.Objective)
export class ObjectiveEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public progress: number;

  @Column()
  public title: string;

  @Column()
  public isRootObjective: boolean;

  @Column()
  public userId: number;

  @Column()
  public cycleId: number;

  @Column()
  public parentObjectiveId?: number;

  @Column({ array: true })
  public alignObjectivesId: number;
}
