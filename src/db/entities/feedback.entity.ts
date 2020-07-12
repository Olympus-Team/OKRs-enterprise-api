import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
