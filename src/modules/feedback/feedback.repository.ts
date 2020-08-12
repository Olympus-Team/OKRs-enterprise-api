import { Repository, EntityRepository, ObjectLiteral, getConnection, EntityManager } from 'typeorm';
import { HttpException } from '@nestjs/common';

import { FeedbackEntity } from '@app/db/entities/feedback.entity';
import { FeedbackDTO } from './feedback.dto';
import { DATABASE_EXCEPTION } from '@app/constants/app.exeption';
import { TopStarType } from '@app/constants/app.enums';

@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity> {
  public async createFeedBack(data: FeedbackDTO, senderId: number, manager: EntityManager): Promise<void> {
    try {
      data.senderId = senderId;
      await manager.getRepository(FeedbackEntity).save(data);
    } catch (error) {
      throw new HttpException(DATABASE_EXCEPTION.message, DATABASE_EXCEPTION.statusCode);
    }
  }

  public async getTopStars(cycleId: number, type: TopStarType): Promise<ObjectLiteral[]> {
    try {
      const databaseType = type == TopStarType.SENDER ? 'senderId' : 'receiverId';
      return await getConnection()
        .query(`select feed.fullName, coalesce(feed.numberOfStar,0) + coalesce(reg.numberOfStar,0) as 
        numberOfStar from (
        select u.id as feedId, u."fullName" as fullName , SUM(ec."numberOfStar") as numberOfStar from feedbacks f 
        left join checkins c on c.id = f."checkinId" 
        left join objectives o on o.id = c."objectiveId" 
        left join users u on u.id = f."${databaseType}" 
        left join evaluation_criterias ec on ec.id = f."evaluationCriteriaId" 
        where o."cycleId" = ${cycleId}
        group by u.id) as feed
        left join (
        select u2.id as regId, u2."fullName", SUM(ec."numberOfStar" ) as numberOfStar from recognitions r2 
        left join users u2 on u2.id = r2."${databaseType}" 
        left join evaluation_criterias ec on ec.id = r2."evaluationCriteriaId" 
        group by u2.id) as reg on feed.feedId = reg.regId order by numberOfStar desc`);
    } catch (error) {
      throw new HttpException(DATABASE_EXCEPTION.message, DATABASE_EXCEPTION.statusCode);
    }
  }
  public async getFeedBackInWeek(
    firstDay: string,
    lastDay: string,
    firstOfLastWeek: string,
    lastOfLastWeek: string,
  ): Promise<ObjectLiteral[]> {
    try {
      const query = `SELECT 
        Sum(feed.numberOfFeedback) AS numberOfFeedback,
        Sum(coalesce(feed.numberOfFeedback, 0) - coalesce(feedLastWeek.numberOfLastFeedback, 0)) AS changing
      FROM
        (SELECT f.id, count(f.id) AS numberOfFeedback
        FROM feedbacks f
        WHERE f."createdAt" BETWEEN '${firstDay}' AND '${lastDay}'
        GROUP BY f.id) AS feed
      FULL OUTER JOIN
        (SELECT f.id, count(f.id) AS numberOfLastFeedback
        FROM feedbacks f
        WHERE f."createdAt" BETWEEN '${firstOfLastWeek}' AND '${lastOfLastWeek}'
        GROUP BY f.id) AS feedLastWeek ON feed.id = feedLastWeek.id`;

      return await this.query(query);
    } catch (error) {
      throw new HttpException(DATABASE_EXCEPTION.message, DATABASE_EXCEPTION.statusCode);
    }
  }

  public async getTopManagerUseCFRsInWeek(
    firstDay: string,
    lastDay: string,
    firstOfLastWeek: string,
    lastOfLastWeek: string,
    adminId: number,
  ): Promise<ObjectLiteral[]> {
    try {
      const query = `SELECT SUM(COALESCE (currentLeader.numberOfLeader, 0)) AS numberOfLeader,
              SUM(coalesce(currentLeader.numberOfLeader, 0) - coalesce(lastWeekLeader.numberOfLeader, 0)) AS changing
        FROM
        (SELECT coalesce(feed."senderId", reg."senderId") AS id,
                Count(coalesce(feed."senderId", reg."senderId")) AS numberOfLeader
          FROM
            (SELECT DISTINCT f."senderId"
            FROM feedbacks f
            LEFT JOIN users u ON u.id = f."senderId"
            WHERE (u."isLeader" = TRUE
                    OR u."roleId" = ${adminId})
              AND f."createdAt" BETWEEN '${firstDay}' AND '${lastDay}' ) AS feed
          FULL OUTER JOIN
            (SELECT DISTINCT r."senderId"
            FROM recognitions r
            LEFT JOIN users u ON u.id = r."senderId"
            WHERE (u."isLeader" = TRUE
                    OR u."roleId" = ${adminId})
              AND r."createdAt" BETWEEN '${firstDay}' AND '${lastDay}') AS reg ON feed."senderId" = reg."senderId"
          GROUP BY id) AS currentLeader
        FULL OUTER JOIN
        (SELECT coalesce(feed."senderId", reg."senderId") AS id,
                Count(coalesce(feed."senderId", reg."senderId")) AS numberOfLeader
          FROM
            (SELECT DISTINCT f."senderId"
            FROM feedbacks f
            LEFT JOIN users u ON u.id = f."senderId"
            WHERE (u."isLeader" = TRUE
                    OR u."roleId" = ${adminId})
              AND f."createdAt" BETWEEN '${firstOfLastWeek}' AND '${lastOfLastWeek}' ) AS feed
          FULL OUTER JOIN
            (SELECT DISTINCT r."senderId"
            FROM recognitions r
            LEFT JOIN users u ON u.id = r."senderId"
            WHERE (u."isLeader" = TRUE
                    OR u."roleId" = ${adminId})
              AND r."createdAt" BETWEEN '${firstOfLastWeek}' AND '${lastOfLastWeek}') AS reg ON feed."senderId" = reg."senderId"
          GROUP BY id) AS lastWeekLeader ON currentLeader.id = lastWeekLeader.id`;
      return await this.query(query);
    } catch (error) {
      throw new HttpException(DATABASE_EXCEPTION.message, DATABASE_EXCEPTION.statusCode);
    }
  }
}
