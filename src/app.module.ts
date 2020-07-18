import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseConnectionService } from './db/database-connetion.service';
import { UserModule } from './modules/user/user.module';
import { JobModule } from './modules/job/job.module';
import { CorsMiddleware } from './shared/middlewares/cors.middleware';
import { RateLimitMiddleware } from './shared/middlewares/rate-limit.middleware';
import { OriginMiddleware } from './shared/middlewares/origin.middleware';
import { TeamModule } from './modules/team/team.module';
import { CycleModule } from './modules/cycle/cycle.module';
import { AuthModule } from './modules/auth/auth.module';
import { EvaluationCriteriaModule } from './modules/evaluation-criteria/evaluation-criteria.module';
import { MeasureUnitModule } from './modules/measure-unit/measure-unit.module';
import { ObjectiveModule } from './modules/objective/objective.module';
import { KeyResultModule } from './modules/keyresult/keyresult.module';
import { LessonModule } from './modules/lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    UserModule,
    JobModule,
    TeamModule,
    CycleModule,
    AuthModule,
    MeasureUnitModule,
    EvaluationCriteriaModule,
    ObjectiveModule,
    KeyResultModule,
    LessonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): MiddlewareConsumer {
    return consumer.apply(CorsMiddleware, RateLimitMiddleware, OriginMiddleware).forRoutes('*');
  }
}
