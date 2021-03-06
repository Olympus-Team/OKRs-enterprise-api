import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date;
}
