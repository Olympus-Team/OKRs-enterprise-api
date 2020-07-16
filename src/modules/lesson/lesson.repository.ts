import { EntityRepository, Repository, ObjectLiteral } from 'typeorm';
import { CommonMessage } from '@app/constants/app.enums';
import { HttpStatus, HttpException } from '@nestjs/common';

import { LessonEntity } from '@app/db/entities/lesson.entity';
import { LessonDTO } from './lesson.dto';
import { ResponseModel } from '@app/constants/app.interface';

@EntityRepository(LessonEntity)
export class LessonRepository extends Repository<LessonEntity> {
  public async getLessons(): Promise<LessonEntity[]> {
    try {
      const queryBuilder = this.createQueryBuilder('lesson').orderBy('lesson.id', 'ASC').getMany();
      return await queryBuilder;
    } catch (error) {
      throw new HttpException(CommonMessage.DATABASE_EXCEPTION, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDetailLesson(slug: string): Promise<LessonEntity> {
    try {
      const queryBuilder = this.createQueryBuilder('lesson').where('lesson.slug = :slug', { slug: slug }).getOne();
      return await queryBuilder;
    } catch (error) {
      throw new HttpException(CommonMessage.DATABASE_EXCEPTION, HttpStatus.BAD_REQUEST);
    }
  }

  public async searchLessons(title: string): Promise<LessonEntity[]> {
    try {
      const queryBuilder = this.createQueryBuilder('lesson')
        .where('lesson.title like :text', {
          text: '%' + title + '%',
        })
        .orderBy('lesson.id', 'ASC')
        .getMany();
      return await queryBuilder;
    } catch (error) {
      throw new HttpException(CommonMessage.DATABASE_EXCEPTION, HttpStatus.BAD_REQUEST);
    }
  }

  public async createLesson(data: ObjectLiteral): Promise<LessonEntity> {
    try {
      return await this.save(data);
    } catch (error) {
      throw new HttpException(CommonMessage.DATABASE_EXCEPTION, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateLesson(id: number, data: LessonDTO): Promise<LessonEntity> {
    try {
      await this.update({ id }, data);
      return await this.findOne({ id });
    } catch (error) {
      throw new HttpException(CommonMessage.DATABASE_EXCEPTION, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteLesson(id: number): Promise<ResponseModel> {
    try {
      const rowEffected: number = (await this.delete({ id })).affected;
      if (rowEffected == 1)
        return {
          statusCode: HttpStatus.OK,
          message: CommonMessage.SUCCESS,
          data: { is_deleted: true },
        };

      return { statusCode: HttpStatus.OK, message: CommonMessage.DELETE_FAIL, data: { is_deleted: false } };
    } catch (error) {
      throw new HttpException(CommonMessage.DATABASE_EXCEPTION, HttpStatus.BAD_REQUEST);
    }
  }
}