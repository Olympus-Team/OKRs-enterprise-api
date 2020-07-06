import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableName, ForeignKey } from '@app/constants/app.enums';
import { dropFksToTable } from '@app/libs/migrationSupport';

export class CreateTableKeyResults1594008910271 implements MigrationInterface {
  private keyResultTable: Table = new Table({
    name: TableName.KeyResult,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'startValue',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'valueObtained',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'targetValue',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'content',
        type: 'varchar',
        isNullable: false,
        length: '255',
      },
      {
        name: 'progress',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'links',
        type: 'varchar',
        length: '255',
      },
      {
        name: ForeignKey.OBJECTIVE_ID,
        type: 'integer',
      },
      {
        name: ForeignKey.MEASURE_UNIT_ID,
        type: 'integer',
      },
    ],
  });

  private pkObjectiveId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.OBJECTIVE_ID],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Objective,
    onDelete: 'CASCADE',
  });
  private pkMeasureUnitId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.MEASURE_UNIT_ID],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.MeasureUnit,
    onDelete: 'CASCADE',
  });

  private tableForeignKey: TableForeignKey[] = [this.pkObjectiveId, this.pkMeasureUnitId];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.keyResultTable);

    await queryRunner.createForeignKeys(TableName.KeyResult, this.tableForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropFksToTable(queryRunner, TableName.KeyResult, [ForeignKey.OBJECTIVE_ID, ForeignKey.MEASURE_UNIT_ID]);

    await queryRunner.dropTable(this.keyResultTable);
  }
}
