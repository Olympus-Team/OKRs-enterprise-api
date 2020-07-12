import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { EvaluationCriteriaEntity } from '../entities/evaluation-criteria.entity';
import { EvaluationCriteriaEnum } from '@app/constants/app.enums';

export class Seeder1006EvaluationCriteria implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(EvaluationCriteriaEntity)
      .values([
        { content: 'Bạn cần cố gắng hơn nữa', numberOfStar: 1, type: EvaluationCriteriaEnum.LEADER_TO_MEMBER },
        { content: 'Bạn đang có sự tiến bộ', numberOfStar: 2, type: EvaluationCriteriaEnum.LEADER_TO_MEMBER },
        {
          content: 'Những góp ý của ban rất có ích với tôi',
          numberOfStar: 3,
          type: EvaluationCriteriaEnum.MEMBER_TO_LEADER,
        },
      ])
      .execute();
  }
}
