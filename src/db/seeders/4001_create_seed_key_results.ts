import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { KeyResultEntity } from '../entities/key-result.entity';

export class Seeder4001KeyResult implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(KeyResultEntity)
      .values([
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 0,
          content: 'Nắm được 70% kiến thức môn kiểm toán doanh nghiệp',
          progress: 0,
          links: 'https://www.facebook.com/',
          objectiveId: 1,
          measureUnitId: 1,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 0,
          content: 'Tìm kiếm được 10 khách hàng đầu tiên',
          progress: 0,
          links: 'https://www.facebook.com/',
          objectiveId: 1,
          measureUnitId: 2,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 0,
          content: 'Key result của mục tiêu 1',
          progress: 0,
          links: 'https://www.facebook.com/',
          objectiveId: 2,
          measureUnitId: 3,
        },
        {
          startValue: 0,
          valueObtained: 0,
          targetValue: 0,
          content: 'Key result của mục tiêu 3',
          progress: 0,
          links: 'https://www.facebook.com/',
          objectiveId: 3,
          measureUnitId: 1,
        },
      ])
      .execute();
  }
}
