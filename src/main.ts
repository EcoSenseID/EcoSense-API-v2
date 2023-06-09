import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INFO } from './helpers';

const options = { customCss: '.swagger-ui .topbar { display: none }' };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('EcoSense API Documentation')
    .setDescription(
      'Everything you need to know when using EcoSense RESTful API.',
    )
    .setVersion(INFO.version)
    .setContact('EcoSense Indonesia', 'https://ecosense.id', 'hey@ecosense.id')
    .addBearerAuth()
    .addServer('http://localhost:3333')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);

  await app.listen(3333, (): void => Logger.log(`App running on port 3333.`));
}
bootstrap();
