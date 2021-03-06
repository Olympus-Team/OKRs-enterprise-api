import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { TableName, CheckinStatus } from '@app/constants/app.enums';
import { CheckinDetailEntity } from './checkin-detail.entity';
import { ObjectiveEntity } from './objective.entity';
import { CFRsEntity } from './cfrs.entity';
import { UserEntity } from './user.entity';

@Entity(TableName.Checkin)
export class CheckinEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public confidentLevel: number;

  @Column()
  public checkinAt: Date;

  @Column()
  public nextCheckinDate: Date;

  @Column({ type: 'enum', enum: CheckinStatus, default: CheckinStatus.DRAFT })
  public status: CheckinStatus;

  @Column()
  public progress: number;

  @Column()
  public teamLeaderId: number;

  @Column()
  public objectiveId: number;

  @Column()
  public isLeaderFeedBack: boolean;

  @Column()
  public isStaffFeedBack: boolean;

  public titleName: string;

  public type: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;

  @OneToMany(() => CheckinDetailEntity, (checkinDetail) => checkinDetail.checkin)
  public checkinDetails: CheckinDetailEntity[];

  @ManyToOne(() => ObjectiveEntity, (objective) => objective.checkins)
  public objective: ObjectiveEntity;

  @OneToMany(() => CFRsEntity, (cfrs) => cfrs.checkin)
  public cfrs: CFRsEntity[];

  @ManyToOne(() => UserEntity, (user) => user.checkin)
  @JoinColumn([{ name: 'teamLeaderId', referencedColumnName: 'id' }])
  public teamLeader: UserEntity;
}
