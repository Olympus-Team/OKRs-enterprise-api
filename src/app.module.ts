import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseConnectionService } from './db/database-connetion.service';
import { RoleModule } from './modules/role/role.module';
import accessEnv from './libs/accessEnv';
import { UserModule } from './modules/user/user.module';
import { JobModule } from './modules/job/job.module';
import { CorsMiddleware } from './shared/middlewares/cors.middleware';
import { RateLimitMiddleware } from './shared/middlewares/rate-limit.middleware';
import { OriginMiddleware } from './shared/middlewares/origin.middleware';
import { TeamModule } from './modules/team/team.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    RoleModule,
    UserModule,
    JobModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  static port: number | string;
  constructor() {
    AppModule.port = accessEnv('SERVER_PORT');
  }
  public configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer.apply(CorsMiddleware, RateLimitMiddleware, OriginMiddleware).forRoutes('*');
  }
}
