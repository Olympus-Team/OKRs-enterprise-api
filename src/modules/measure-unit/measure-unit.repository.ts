import { Repository, EntityRepository, ObjectLiteral } from 'typeorm';

import { MeasureUnitEntity } from '@app/db/entities/measure-unit.entity';
import { MeasureUnitDTO } from './measure-unit.dto';

@EntityRepository(MeasureUnitEntity)
export class MeasureRepository extends Repository<MeasureUnitEntity> {
  public async getList(): Promise<MeasureUnitEntity[]> {
    return await this.find();
  }

  public async createMeasureUnit(data: MeasureUnitDTO): Promise<MeasureUnitEntity> {
    return await this.save(data);
  }

  public async getMeasureUnitDetail(id: number): Promise<MeasureUnitEntity> {
    return await this.findOne({ where: { id } });
  }

  public async updateMeasureUnit(id: number, data: Partial<MeasureUnitDTO>): Promise<MeasureUnitEntity> {
    await this.update({ id }, data);
    return await this.findOne({ id });
  }

  public async deleteMeasureUnit(id: number): Promise<ObjectLiteral> {
    const rowEffected: number = await (await this.delete({ id })).affected;
    return { isDeleted: rowEffected === 1 ? true : false };
  }
}
