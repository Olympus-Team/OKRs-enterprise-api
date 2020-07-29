import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableName, ForeignKey } from '@app/constants/app.enums';
import { dropFksToTable } from '@app/libs/migrationSupport';

export class CreateTableUserStars1594008773951 implements MigrationInterface {
  private userStarTable: Table = new Table({
    name: TableName.UserStar,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'accumulatedStar',
        type: 'integer',
      },
      {
        name: 'currentCycleStar',
        type: 'integer',
      },
      {
        name: ForeignKey.USER_ID,
        type: 'integer',
      },
      {
        name: ForeignKey.CYCLE_ID,
        type: 'integer',
      },
    ],
  });

  // Create ForeignKey: userId
  private pkUserId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.USER_ID],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.User,
    onDelete: 'SET NULL',
  });

  private pkCycleId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.CYCLE_ID],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Cycle,
    onDelete: 'SET NULL',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userStarTable, true);

    await queryRunner.createForeignKey(TableName.UserStar, this.pkUserId);
    await queryRunner.createForeignKey(TableName.UserStar, this.pkCycleId);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropFksToTable(queryRunner, TableName.UserStar, [ForeignKey.USER_ID]);
    await dropFksToTable(queryRunner, TableName.UserStar, [ForeignKey.CYCLE_ID]);

    await queryRunner.dropTable(TableName.UserStar, true);
  }
}
