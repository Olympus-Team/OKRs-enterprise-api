import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ObjectiveEntity } from '@app/db/entities/objective.entity';
import { ObjectiveRepository } from './objective.repository';
import { ObjectiveController } from './objective.controller';
import { ObjectiveService } from './objective.service';
import { UserRepository } from '../user/user.repository';
import { KeyResultRepository } from '../keyresult/keyresult.repository';
import { CycleRepository } from '../cycle/cycle.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ObjectiveEntity,
      ObjectiveRepository,
      UserRepository,
      KeyResultRepository,
      CycleRepository,
    ]),
  ],
  controllers: [ObjectiveController],
  providers: [ObjectiveService],
})
export class ObjectiveModule {}
