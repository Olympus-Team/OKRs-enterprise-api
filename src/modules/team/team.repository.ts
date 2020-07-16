import { EntityRepository, Repository } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { TeamEntity } from '@app/db/entities/team.entity';
import { TeamDTO } from './team.dto';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {
  public async getTeams(options: IPaginationOptions): Promise<Pagination<TeamEntity>> {
    const queryBuilder = this.createQueryBuilder('team');
    return await paginate<TeamEntity>(queryBuilder, options);
  }

  public async getDetailTeam(id: number): Promise<TeamEntity> {
    return await this.findOne({ where: { id } });
  }

  public async createTeam(data: TeamDTO): Promise<TeamEntity> {
    return await this.save(data);
  }

  public async updateTeam(id: number, data: TeamDTO): Promise<TeamEntity> {
    await this.update({ id }, data);
    return await this.findOne({ id });
  }

  public async deteleTeam(id: number): Promise<ObjectLiteral> {
    await this.delete({ id });
    return { isDeleted: true };
  }
}
