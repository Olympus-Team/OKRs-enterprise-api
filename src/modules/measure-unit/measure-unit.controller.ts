import { Controller, Post, Body, Param, Put, Delete, UsePipes, Get, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { MeasureUnitService } from './measure-unit.service';
import { MeasureUnitDTO } from './measure-unit.dto';
import { ValidationPipe } from '@app/shared/pipes/validation.pipe';
import { MeasureUnitEntity } from '@app/db/entities/measure-unit.entity';
import { currentPage, limitPagination } from '@app/constants/app.magic-number';
import { RouterEnum } from '@app/constants/app.enums';

@Controller('/api/v1/measure-units')
export class MeasureUnitController {
  constructor(private _measureService: MeasureUnitService) {}

  @Get(':page')
  public getMeasureUnits(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Pagination<MeasureUnitEntity>> {
    page = page ? page : currentPage;
    limit = limit ? limit : limitPagination;
    return this._measureService.getMeasureUnits({ page, limit, route: RouterEnum.MEASURE_UNIT_ROUTE });
  }

  @Get(':id')
  public getMeasureUnitDetail(@Param('id') id: number): Promise<MeasureUnitEntity> {
    return this._measureService.getMeasureUnitDetail(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public createMeasureUnit(@Body() role: MeasureUnitDTO): Promise<MeasureUnitEntity> {
    return this._measureService.createMeasureUnit(role);
  }

  @Put(':id')
  public updateMeasureUnit(@Param('id') id: number, @Body() data: MeasureUnitDTO): Promise<MeasureUnitEntity> {
    return this._measureService.updateMeasureUnit(id, data);
  }

  @Delete(':id')
  public deleteMeasureUnit(@Param('id') id: number): any {
    return this._measureService.deleteMeasureUnit(id);
  }
}
