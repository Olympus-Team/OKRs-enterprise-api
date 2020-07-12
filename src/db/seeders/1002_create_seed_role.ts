import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { RoleEnum } from '@app/constants/app.enums';

export class Seeder1002Role implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values([{ name: RoleEnum.ADMIN }, { name: RoleEnum.HR }, { name: RoleEnum.STAFF }])
      .execute();
  }
}
