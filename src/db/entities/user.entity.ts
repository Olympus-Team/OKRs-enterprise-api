import { hashSync, compareSync } from 'bcryptjs';
import { Entity, BaseEntity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, ObjectLiteral } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { _salt } from '@app/constants/app.config';
import { UserResponse } from '@app/modules/auth/auth.interface';

@Entity({ name: TableName.User })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public _salt: string;

  @Column()
  public fullName: string;

  @Column()
  public avatarURL: string;

  @Column()
  public gravatarURL: string;

  @Column()
  public jobPositionId: number;

  @Column()
  public roleId: number;

  @Column()
  public isActive: boolean;

  @Column()
  public isApproved: boolean;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = hashSync(this.password, _salt);
  }

  @BeforeUpdate()
  async updateHashPassword(): Promise<void> {
    if (this.password !== this.password) {
      this.password = hashSync(this.password, _salt);
    }
  }

  async comparePassword(inputPassword: string): Promise<boolean> {
    return compareSync(inputPassword, this.password);
  }

  public toJSON(): UserResponse {
    return {
      email: this.email,
      fullName: this.fullName,
      gravatarUrl: this.gravatarURL ? this.gravatarURL : '',
      avatarUrl: this.avatarURL ? this.avatarURL : '',
    };
  }
}
