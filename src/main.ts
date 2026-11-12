import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { IdPipe } from './shared/pipes/id.pipe';
import helmet from 'helmet';
import csrf from 'als-csrf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(csrf());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalPipes(new IdPipe());
  // app.useGlobalFilters(new LogFilter());
  // app.useGlobalGuards(new ApiKeyGuard());

  const config = new DocumentBuilder()
    .setTitle('Nest Ecommerce Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
