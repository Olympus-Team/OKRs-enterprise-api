import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { TeamEntity } from '../entities/team.entity';

export class Seeder1003Team implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(TeamEntity)
      .values([{ name: 'Phòng kinh doanh' }, { name: 'Team sói già' }, { name: 'Olympus teams' }])
      .execute();
  }
}
