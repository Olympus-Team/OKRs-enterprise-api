import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { MeasureUnitController } from './measure-unit.controller';
import { MeasureUnitService } from './measure-unit.service';
import { MeasureUnitEntity } from '@app/db/entities/measure-unit.entity';
import { MeasureRepository } from './measure-unit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MeasureUnitEntity, MeasureRepository])],
  controllers: [MeasureUnitController],
  providers: [MeasureUnitService],
})
export class MeasureUnitModule {}
