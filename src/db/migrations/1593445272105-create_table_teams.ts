import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName } from '@constants/Enums';

export class createTableTeams1593445272105 implements MigrationInterface {
  private teamsTable: Table = new Table({
    name: TableName.Teams,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'name',
        type: 'varchar',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(this.teamsTable);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable(this.teamsTable);
  }
}
