import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableName } from '@app/constants/app.enums';
import { dropFksToTable } from '@app/libs/migrationSupport';

export class createTableUsers1593445390980 implements MigrationInterface {
  private usersTable: Table = new Table({
    name: TableName.User,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
      },
      {
        name: 'email',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
        length: '255',
      },
      {
        name: 'password',
        type: 'varchar',
        isNullable: false,
        length: '255',
      },
      {
        name: '_salt',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'fullName',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'avatarURL',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'gravatarURL',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'isActive',
        type: 'bool',
        default: false,
      },
      {
        name: 'isApproved',
        type: 'bool',
        default: false,
      },
      {
        name: 'roleID',
        type: 'integer',
        isNullable: true,
      },
      {
        name: 'jobPositionID',
        type: 'integer',
        isNullable: true,
      },
      {
        name: 'createdAt',
        type: 'date',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'deactivatedAt',
        type: 'date',
        isNullable: true,
      },
    ],
  });

  private fkRoleId: TableForeignKey = new TableForeignKey({
    columnNames: ['roleID'],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.Role,
    onDelete: 'CASCADE',
  });

  private fkJobPositionId: TableForeignKey = new TableForeignKey({
    columnNames: ['jobPositionID'],
    referencedColumnNames: ['id'],
    referencedTableName: TableName.JobPosition,
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.usersTable, true);
    await queryRunner.createForeignKeys(TableName.User, [this.fkRoleId, this.fkJobPositionId]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await dropFksToTable(queryRunner, TableName.User, ['roleID', 'jobPositionID']);
    await queryRunner.dropTable(this.usersTable, true);
  }
}
