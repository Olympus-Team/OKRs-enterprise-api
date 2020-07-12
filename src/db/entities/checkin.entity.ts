import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

@Entity(TableName.Checkin)
export class CheckinEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public valueObtained: number;

  @Column()
  public confidentLevel: number;

  @Column()
  public content: string;

  @Column()
  public checkinAt: Date;

  @Column()
  public nextCheckinDate: Date;

  @Column()
  public status: boolean;

  @Column()
  public teamLeaderId: number;

  @Column()
  public templateCheckinId: number;

  @Column()
  public keyResultId: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
