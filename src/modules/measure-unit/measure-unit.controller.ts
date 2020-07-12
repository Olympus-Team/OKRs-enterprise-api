import { Controller, Post, Body, Param, Put, Delete, UsePipes, Get, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { MeasureUnitService } from './measure-unit.service';
import { MeasureUnitDTO } from './measure-unit.dto';
import { ValidationPipe } from '@app/shared/pipes/validation.pipe';
import { MeasureUnitEntity } from '@app/db/entities/measure-unit.entity';

@Controller('/api/v1/measure-units')
export class MeasureUnitController {
  constructor(private _measureService: MeasureUnitService) {}

  @Get(':page')
  public getMeasureUnitByPage(@Query('page') page: number): Promise<Pagination<MeasureUnitEntity>> {
    const limit = 3;
    return this._measureService.getMeasureByPage({ page, limit, route: 'localhost:3000/api/v1/measure-units' });
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
