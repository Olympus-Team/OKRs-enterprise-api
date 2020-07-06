import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableName, ForeignKey } from '@app/constants/app.enums';

export class CreateTableFieldTemplates1594009347849 implements MigrationInterface {
  private fieldTemplateTable: Table = new Table({
    name: TableName.FieldTemplate,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'colmnName',
        type: 'varchar',
        isNullable: false,
        length: '255',
      },
      {
        name: ForeignKey.TEMPLATE_CHECKIN_ID,
        type: 'integer',
      },
    ],
  });

  private pkTemplateCheckinId: TableForeignKey = new TableForeignKey({
    columnNames: [ForeignKey.TEMPLATE_CHECKIN_ID],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.TemplateCheckin,
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.fieldTemplateTable);

    await queryRunner.createForeignKey(TableName.FieldTemplate, this.pkTemplateCheckinId);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.fieldTemplateTable);
  }
}
