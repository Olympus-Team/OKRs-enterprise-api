import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { MeasureUnitEntity } from '@app/db/entities/measure-unit.entity';
import { MeasureRepository } from './measure-unit.repository';
import { MeasureUnitDTO } from './measure-unit.dto';

@Injectable()
export class MeasureUnitService {
  constructor(private _measureRepository: MeasureRepository) {}

  public getMeasureUnits(options: IPaginationOptions): Promise<Pagination<MeasureUnitEntity>> {
    return paginate<MeasureUnitEntity>(this._measureRepository, options);
  }

  public createMeasureUnit(data: MeasureUnitDTO): Promise<MeasureUnitEntity> {
    return this._measureRepository.createMeasureUnit(data);
  }

  public getMeasureUnitDetail(id: number): Promise<MeasureUnitEntity> {
    return this._measureRepository.getMeasureUnitDetail(id);
  }

  public updateMeasureUnit(id: number, data: Partial<MeasureUnitDTO>): Promise<MeasureUnitEntity> {
    return this._measureRepository.updateMeasureUnit(id, data);
  }

  public deleteMeasureUnit(id: number): Promise<ObjectLiteral> {
    return this._measureRepository.deleteMeasureUnit(id);
  }
}
