import { createHash } from 'crypto';
import { hashSync, compareSync } from 'bcryptjs';
import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { _salt } from '@app/constants/app.config';
import { JobEntity } from './job.entity';
import { UserTeamEntity } from './user-team.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: TableName.User })
export class UserEntity {
  @PrimaryGeneratedColumn()
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
  public jobPositionId?: number;

  @Column()
  public isActive: boolean;

  @Column()
  public isApproved: boolean;

  @Column()
  public deactivatedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  public role: RoleEntity;

  @ManyToOne(() => JobEntity, (jobPosition) => jobPosition.users)
  public jobPosition: JobEntity;

  @OneToMany(() => UserTeamEntity, (userTeam) => userTeam.user)
  public userToTeams: UserTeamEntity[];

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = hashSync(this.password, _salt);
  }

  @BeforeInsert()
  public async generateGravatar(): Promise<void> {
    const sha512 = createHash('sha512').update(this.email).digest('hex');
    const size = 200;
    this.gravatarURL = `https://gravatar.com/avatar/${sha512}?s=${size}&d=retro`;
  }

  @BeforeUpdate()
  public async updateHashPassword(): Promise<void> {
    if (this.password !== this.password) {
      this.password = hashSync(this.password, _salt);
    }
  }

  public async comparePassword(inputPassword: string): Promise<boolean> {
    return await compareSync(inputPassword, this.password);
  }
}
