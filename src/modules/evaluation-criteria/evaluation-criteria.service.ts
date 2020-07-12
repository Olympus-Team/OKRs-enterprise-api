import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { EvaluationCriteriaEntity } from '@app/db/entities/evaluation-criteria.entity';
import { EvaluationCriteriaRepository } from './evaluation-criteria.repository';
import { EvaluationDTO } from './evaluation-criteria.dto';

@Injectable()
export class EvaluationCriteriaService {
  constructor(private _evaluationCriteriaRepository: EvaluationCriteriaRepository) {}

  public getEvaluationCriterias(options: IPaginationOptions): Promise<Pagination<EvaluationCriteriaEntity>> {
    return paginate<EvaluationCriteriaEntity>(this._evaluationCriteriaRepository, options);
  }

  public createCriteria(data: EvaluationDTO): Promise<EvaluationCriteriaEntity> {
    return this._evaluationCriteriaRepository.createCriteria(data);
  }

  public getCriteriaDetail(id: number): Promise<EvaluationCriteriaEntity> {
    return this._evaluationCriteriaRepository.getCriteriaDetail(id);
  }

  public updateCriteria(id: number, data: Partial<EvaluationDTO>): Promise<EvaluationCriteriaEntity> {
    return this._evaluationCriteriaRepository.updateCriteria(id, data);
  }

  public deleteCriteria(id: number): Promise<ObjectLiteral> {
    return this._evaluationCriteriaRepository.deleteCriteria(id);
  }
}
