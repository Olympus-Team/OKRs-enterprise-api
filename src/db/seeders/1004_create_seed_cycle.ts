import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CycleEntity } from '../entities/cycle.entity';

export class Seeder1004Cycle implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CycleEntity)
      .values([
        { name: 'Fall 2019', startDate: '2019-09-01', endDate: '2019-12-31' },
        { name: 'Spring 2020', startDate: '2020-01-01', endDate: '2020-04-30' },
        { name: 'Summer 2020', startDate: '2020-05-01', endDate: '2020-08-31' },
      ])
      .execute();
  }
}
