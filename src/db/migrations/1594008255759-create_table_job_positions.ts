import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName } from '@app/constants/app.enums';

export class CreateTableJobPositions1594008255759 implements MigrationInterface {
  private jopPosTable: Table = new Table({
    name: TableName.JobPosition,
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
        length: '255',
      },
      {
        name: 'description',
        type: 'varchar',
        isNullable: true,
        length: '255',
      },
      {
        name: 'createdAt',
        type: 'timestamptz',
        default: 'now()',
      },
      {
        name: 'updatedAt',
        type: 'timestamptz',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(this.jopPosTable, true);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable(this.jopPosTable, true);
  }
}
