import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableName, ForeignKey } from '@app/constants/app.enums';
import { dropFksToTable } from '@app/libs/migrationSupport';

export class CreateTableObjectives1594008870217 implements MigrationInterface {
  private objectiveTable: Table = new Table({
    name: TableName.Objective,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'progress',
        type: 'integer',
        default: 0,
      },
      {
        name: 'title',
        type: 'varchar',
        isNullable: false,
        length: '255',
      },
      {
        name: 'isRootObjective',
        type: 'bool',
        default: false,
      },
      {
        name: ForeignKey.USER_ID,
        type: 'integer',
        isNullable: true,
      },
      {
        name: ForeignKey.CYCLE_ID,
        type: 'integer',
        isNullable: true,
      },
      {
        name: ForeignKey.PARENT_OBJECTIVE_ID,
        type: 'integer',
        isNullable: true,
      },
      {
        name: ForeignKey.ALIGN_OBJECTIVE_ID,
        type: 'integer',
        isArray: true,
        isNullable: true,
      },
      {
        name: 'isCompleted',
        type: 'bool',
        default: false,
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
  });
  private pkParentObectiveId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.PARENT_OBJECTIVE_ID],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Objective,
    onDelete: 'SET NULL',
  });

  private tableForeignKey: TableForeignKey[] = [this.pkUserId, this.pkCycleId, this.pkParentObectiveId];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.objectiveTable);

    await queryRunner.createForeignKeys(TableName.Objective, this.tableForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropFksToTable(queryRunner, TableName.Objective, [
      ForeignKey.USER_ID,
      ForeignKey.CYCLE_ID,
      ForeignKey.PARENT_OBJECTIVE_ID,
      ForeignKey.ALIGN_OBJECTIVE_ID,
    ]);

    await queryRunner.dropTable(this.objectiveTable);
  }
}
