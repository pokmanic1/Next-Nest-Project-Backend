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

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,          // sterge automat campurile care NU sunt in DTO
    forbidNonWhitelisted: true, // arunca eroare daca vine un camp in plus, necunoscut
    transform: true,          // converteste automat body-ul in instanta DTO
  }));

  
  app.useGlobalInterceptors(new TransformInterceptor())
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
