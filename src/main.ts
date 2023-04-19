import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// somewhere in your initialization file

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //allow class validation
  app.useGlobalPipes(new ValidationPipe());

  //Allow cookies manipulation on routes
  app.use(cookieParser());

  app.enableCors();

  //Generate API documentations
  const config = new DocumentBuilder()
    .setTitle('Trampay Challenge API docs')
    .setDescription('Trampay Challenge API docs for available routes')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3333);
}
bootstrap();
