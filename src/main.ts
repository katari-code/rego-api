import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  app.enableCors();
  await app.listen(5000);
}
bootstrap();
