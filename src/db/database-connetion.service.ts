import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DbConfig } from '@app/constants/app.enums';
import { isDevMode } from '@app/constants/app.config';
import accessEnv from '@app/libs/accessEnv';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { JobEntity } from './entities/job.entity';
import { TeamEntity } from './entities/team.entity';
import { CycleEntity } from './entities/cycle.entity';
import { UserTeamEntity } from './entities/user-team.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { MeasureUnitEntity } from './entities/measure-unit.entity';

const type = DbConfig.DB_TYPE;
const host = accessEnv(DbConfig.DB_HOST);
const port = +accessEnv(DbConfig.DB_PORT);
const username = accessEnv(DbConfig.DB_USER);
const password = accessEnv(DbConfig.DB_PASSWORD);
const database = accessEnv(DbConfig.DB_NAME);

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...DatabaseConnectionService.createTypeOrmOptions(),
    };
  }
  public static createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...DatabaseConnectionService.postgresOrmOptions(),
      keepConnectionAlive: true,
    };
  }
  public static postgresOrmOptions(): PostgresConnectionOptions {
    return {
      type,
      port,
      host,
      username,
      password,
      database,
      entities: [RoleEntity, UserEntity, JobEntity, TeamEntity, UserTeamEntity, MeasureUnitEntity, CycleEntity],
      migrations: ['dist/db/migrations/*.js'],
      cli: {
        migrationsDir: 'src/db/migrations/*.ts',
        entitiesDir: 'src/db/entities/*.ts',
      },
      dropSchema: false,
      logging: isDevMode ? true : false,
      synchronize: false,
    };
  }
}
