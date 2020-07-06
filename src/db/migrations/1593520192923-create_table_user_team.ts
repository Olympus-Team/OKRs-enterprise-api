import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { dropFksToTable } from '@app/libs/migrationSupport';

export class createTableUserTeam1593520192923 implements MigrationInterface {
  private userTeamTable: Table = new Table({
    name: TableName.UserTeam,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'isLeader',
        type: 'bool',
      },
      {
        name: 'userId',
        type: 'integer',
      },
      {
        name: 'teamId',
        type: 'integer',
      },
    ],
  });

  // Create ForeignKey: userId
  private fkUserId: TableForeignKey = new TableForeignKey({
    columnNames: ['userId'],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.User,
    onDelete: 'CASCADE',
  });

  // Create ForeignKey: teamId
  private fkTeamId: TableForeignKey = new TableForeignKey({
    columnNames: ['teamId'],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Teams,
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(this.userTeamTable, true);

    queryRunner.createForeignKeys(TableName.UserTeam, [this.fkUserId, this.fkTeamId]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropFksToTable(queryRunner, TableName.User, ['userId', 'teamId']);

    queryRunner.dropTable(TableName.UserTeam, true);
  }
}
