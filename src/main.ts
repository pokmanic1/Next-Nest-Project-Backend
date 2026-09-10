import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './utils/transform.interceptor';
//npm install cookie-parser
//npm install -D @types/cookie-parser
import cookieParser from 'cookie-parser';
//npm install class-validator class-transformer
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalInterceptors(new TransformInterceptor())
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();