import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import accessEnv from './libs/accessEnv';

declare const module: any;

const bootstrap = async (): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule);
  const prefixApiV1: string = accessEnv('API_PREFIX_V1');
  const port: number | string = accessEnv('SERVER_PORT');
  const options = new DocumentBuilder()
    .setTitle('OKRs APIs')
    .setDescription('The OKRs API docs')
    .setVersion('1.0')
    .addTag('OKRs')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
  await app.setGlobalPrefix(prefixApiV1);

  await app.listen(port);
  await SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};

bootstrap();
