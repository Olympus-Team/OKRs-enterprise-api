import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName, EvaluationCriteriaEnum } from '@app/constants/app.enums';

export class CreateTableEvaluationCriterias1594008610938 implements MigrationInterface {
  private evalCriteriaTable: Table = new Table({
    name: TableName.EvaluationCriteria,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'content',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'numberOfStar',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'type',
        type: 'enum',
        enum: [EvaluationCriteriaEnum.LEADER_TO_MEMBER, EvaluationCriteriaEnum.MEMBER_TO_LEADER],
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.evalCriteriaTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.evalCriteriaTable);
  }
}
