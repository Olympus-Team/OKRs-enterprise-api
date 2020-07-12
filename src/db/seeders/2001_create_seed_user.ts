import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { hashSync } from 'bcryptjs';

import { UserEntity } from '../entities/user.entity';
import accessEnv from '@app/libs/accessEnv';
import { _salt } from '@app/constants/app.config';

export class Seeder2001User implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const seedPassword: string = accessEnv('SEED_PASSSWORD');
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          email: 'ducpvse05320@fpt.edu.vn',
          _salt: _salt,
          password: hashSync(seedPassword, _salt),
          fullName: 'Phan Văn Đức',
          jobPositionId: 1,
          roleId: 1,
          isActive: true,
          isApproved: true,
        },
        {
          email: 'ducnmhe130666@fpt.edu.vn',
          _salt: _salt,
          password: hashSync(seedPassword, _salt),
          fullName: 'Ngô Minh Đức',
          jobPositionId: 2,
          roleId: 2,
          isActive: true,
          isApproved: true,
        },
        {
          email: 'hiepdqse05627@fpt.edu.vn',
          _salt: _salt,
          password: hashSync(seedPassword, _salt),
          fullName: 'Đỗ Quang Hiệp',
          jobPositionId: 3,
          roleId: 3,
          isActive: true,
          isApproved: true,
        },
      ])
      .execute();
  }
}
