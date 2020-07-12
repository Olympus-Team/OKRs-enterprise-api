import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationCriteriaController } from './evaluation-criteria.controller';
import { EvaluationCriteriaEntity } from '@app/db/entities/evaluation-criteria.entity';
import { EvaluationCriteriaRepository } from './evaluation-criteria.repository';
import { EvaluationCriteriaService } from './evaluation-criteria.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationCriteriaEntity, EvaluationCriteriaRepository])],
  controllers: [EvaluationCriteriaController],
  providers: [EvaluationCriteriaService],
})
export class EvaluationCriteriaModule {}
