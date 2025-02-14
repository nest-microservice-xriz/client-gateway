import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './conf';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main-gateway')

  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.useGlobalFilters(new RpcCustomExceptionFilter())

  await app.listen(envs.PORT ?? 3000);
  logger.log(`Gateway runninng on port ${envs.PORT}`) 
}
bootstrap();
