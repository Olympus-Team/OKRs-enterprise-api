import { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEnum } from '@app/constants/app.enums';

export class SeedTableRoles1594024689396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql = `INSERT INTO public.roles (name, "createdAt", "updatedAt") 
      VALUES('${RoleEnum.ADMIN}', now(), now()),
        ('${RoleEnum.TEAM_LEADER}', now(), now()),
        ('${RoleEnum.HR}', now(), now()),
        ('${RoleEnum.STAFF}', now(), now());`;
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.roles WHERE 
      name='${RoleEnum.ADMIN}' 
      OR name='${RoleEnum.TEAM_LEADER}' 
      OR name='${RoleEnum.HR}' 
      OR name='${RoleEnum.STAFF}';`);
  }
}
