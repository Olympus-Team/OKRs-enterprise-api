import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { ObjectiveEntity } from '../entities/objective.entity';

export class Seeder3001bjective implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(ObjectiveEntity)
      .values([
        {
          title: 'Đạt doanh thu 400.000.000 Đ trong quý tới',
          progress: 0,
          userId: 1,
          isRootObjective: true,
          cycleId: 1,
        },
        {
          title: 'Mua xe ô tô Vinfast LUX SA 2.0',
          progress: 0,
          userId: 1,
          isRootObjective: false,
          cycleId: 2,
        },
        {
          title: 'Ký kết được 15 hợp đồng với khách hàng',
          progress: 0,
          userId: 2,
          isRootObjective: false,
          cycleId: 2,
        },
        {
          title: 'Hoàn thành 100% thiết kế sự án HLE',
          progress: 0,
          userId: 3,
          isRootObjective: false,
          cycleId: 2,
        },
      ])
      .execute();
  }
}
