import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './shared/filter/http-exception.filter';
import { LogServerStatus } from './shared/helpers/log-server-status';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const currentEnv = configService.get('NODE_ENV') || 'dev';
    const host = app.getHttpServer().address()?.address || 'localhost';
    const swaggerBasePath = '';
    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalFilters(new AllExceptionsFilter());
    LogServerStatus.logEnv({ currentEnv });
    const swaggerRoute = `${swaggerBasePath}/docs`;

    const setupSwagger = (application: INestApplication) => {
      application.use(
        [swaggerRoute, `${swaggerBasePath}/docs-json`],
        basicAuth({
          challenge: true,
          users: {
            [configService.get('SISTEMA_GARCOM_SWAGGER_USERNAME')]:
              configService.get('SISTEMA_GARCOM_SWAGGER_PASSWORD'),
          },
        }),
      );

      const config = new DocumentBuilder()
        .setTitle(configService.get('SISTEMA_GARCOM_SWAGGER_TITLE'))
        .setDescription(
          configService.get('SISTEMA_GARCOM_SWAGGER_DESCRIPTION'),
        )
        .setVersion(configService.get('SISTEMA_GARCOM_SWAGGER_VERSION'))
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(application, config);
      SwaggerModule.setup(swaggerRoute, application, document);
    };

    app.enableCors();

    setupSwagger(app);

    const port = configService.get('SISTEMA_GARCOM_PORT') || 3000;

    await app.listen(port, '0.0.0.0');
    LogServerStatus.logSuccess({ port, host });
    LogServerStatus.logWarn(swaggerRoute);

  } catch (error) {
    LogServerStatus.logError({ error });
    console.error('Error starting the application:', error);
  }
}

bootstrap();
