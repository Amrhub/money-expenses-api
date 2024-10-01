import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Money Expenses')
    .setVersion('1.0')
    .addCookieAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      const key =
        controllerKey.toLowerCase().replace('controller', '') +
        methodKey.charAt(0).toUpperCase() +
        methodKey.slice(1);
      return key;
    },
  });

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
