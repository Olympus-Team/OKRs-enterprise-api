import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { CheckinEntity } from './checkin.entity';
import { KeyResultEntity } from './key-result.entity';

@Entity(TableName.CheckinDetail)
export class CheckinDetailEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public targetValue: number;

  @Column()
  public valueObtained: number;

  @Column()
  public confidentLevel: number;

  @Column()
  public progress: string;

  @Column()
  public problems: string;

  @Column()
  public plans: string;

  @Column()
  public checkinId: number;

  @Column()
  public keyResultId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @ManyToOne(() => CheckinEntity, (checkin) => checkin.checkinDetails)
  public checkin: CheckinEntity;

  @OneToOne(() => KeyResultEntity)
  @JoinColumn()
  public keyResult: KeyResultEntity;
}
