import { Repository, EntityRepository } from 'typeorm';
import { HttpStatus, HttpException } from '@nestjs/common';

import { FeedbackEntity } from '@app/db/entities/feedback.entity';
import { CommonMessage } from '@app/constants/app.enums';
import { FeedbackDTO } from './feedback.dto';

@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity> {
  public async createFeedBack(data: FeedbackDTO): Promise<void> {
    try {
      this.save(data);
    } catch (error) {
      throw new HttpException(CommonMessage.DATABASE_EXCEPTION, HttpStatus.BAD_REQUEST);
    }
  }
}