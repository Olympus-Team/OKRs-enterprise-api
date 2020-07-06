import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.Feeback)
export class FeebackEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public inferiorId: number;

  @Column()
  public superiorId: number;

  @Column()
  public content: string;

  @Column()
  public isLeaderToStaff: boolean;

  @Column()
  public evaluationCriteriaId: number;

  @Column()
  public checkinId: number;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;
}
