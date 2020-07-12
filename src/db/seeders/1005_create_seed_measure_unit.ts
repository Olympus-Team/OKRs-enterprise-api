import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { MeasureUnitEntity } from '../entities/measure-unit.entity';

export class Seeder1004MeasureUnit implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(MeasureUnitEntity)
      .values([
        { type: 'Percent', preset: '%', index: 1 },
        { type: 'VND', preset: 'VND', index: 2 },
        { type: 'Triệu', preset: 'tr', index: 3 },
        { type: 'Project', preset: 'prj', index: 4 },
        { type: 'USD', preset: '$', index: 5 },
      ])
      .execute();
  }
}
