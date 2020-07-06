import { hashSync, compareSync } from 'bcryptjs';
import { Entity, BaseEntity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { UserToken, JwtPayload } from '@app/constants/app.interfaces';
import { createJWT } from '@app/libs/jwt';
import { _salt } from '@app/constants/app.config';

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

  async verifyPassword(inputPassword: string): Promise<boolean> {
    return compareSync(inputPassword, this.password);
  }

  generateToken(): UserToken {
    const expiresIn: number = 30 * 24 * 60 * 60; // 1 month
    const payload: JwtPayload = { id: this.id };
    const token = createJWT(payload, expiresIn);
    return {
      user: this,
      token: `Bearer ${token}`,
    };
  }
}
