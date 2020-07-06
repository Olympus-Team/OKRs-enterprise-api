import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

export class createTableUserStar1593520051461 implements MigrationInterface {
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
        name: 'userId',
        type: 'integer',
      },
    ],
  });

  // Create ForeignKey: jobPositionId
  private pkUserId: TableForeignKey = new TableForeignKey({
    columnNames: ['userId'],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.User,
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(this.userStarTable, true);

    queryRunner.createForeignKey(TableName.UserStar, this.pkUserId);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable(TableName.UserStar, true);
  }
}
