import { Controller, Post, Body, Param, Put, Delete, UsePipes, Get, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { EvaluationDTO } from './evaluation-criteria.dto';
import { ValidationPipe } from '@app/shared/pipes/validation.pipe';
import { EvaluationCriteriaEntity } from '@app/db/entities/evaluation-criteria.entity';
import { RouterEnum } from '@app/constants/app.enums';
import { EvaluationCriteriaService } from './evaluation-criteria.service';
import { currentPage, limitPagination } from '@app/constants/app.magic-number';

@Controller('/api/v1/criterias')
export class EvaluationCriteriaController {
  constructor(private _evaluationCriteriaService: EvaluationCriteriaService) {}

  @Get(':page')
  public getEvaluationCriterias(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Pagination<EvaluationCriteriaEntity>> {
    page = page ? page : currentPage;
    limit = limit ? limit : limitPagination;
    return this._evaluationCriteriaService.getEvaluationCriterias({
      page,
      limit,
      route: RouterEnum.EVALUATION_CRITERIA_ROUTE,
    });
  }

  @Get(':id')
  public getCriteriaDetail(@Param('id') id: number): Promise<EvaluationCriteriaEntity> {
    return this._evaluationCriteriaService.getCriteriaDetail(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public createCriteria(@Body() role: EvaluationDTO): Promise<EvaluationCriteriaEntity> {
    return this._evaluationCriteriaService.createCriteria(role);
  }

  @Put(':id')
  public updateCriteria(@Param('id') id: number, @Body() data: EvaluationDTO): Promise<EvaluationCriteriaEntity> {
    return this._evaluationCriteriaService.updateCriteria(id, data);
  }

  @Delete(':id')
  public deleteCriteria(@Param('id') id: number): any {
    return this._evaluationCriteriaService.deleteCriteria(id);
  }
}
