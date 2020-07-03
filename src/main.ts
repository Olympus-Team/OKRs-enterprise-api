import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import accessEnv from './libs/accessEnv';

declare const module: any;

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const prefixApiV1: string = accessEnv('API_PREFIX_V1');
  app.setGlobalPrefix(prefixApiV1);

  const options = new DocumentBuilder()
    .setTitle('OKRs APIs')
    .setDescription('The OKRs API docs')
    .setVersion('1.0')
    .addTag('OKRs')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(AppModule.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
