import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global.exception.filter';
import { ResponseInterceptor } from './filters/global.response.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties not in DTO
      forbidNonWhitelisted: true, // throw error if extra fields present
      transform: true, // auto-transform types (string -> number)
      transformOptions: {
        enableImplicitConversion: true, // converts based on type
      },
    }),
  );

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Add both URLs
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Authorization'],
  });
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
