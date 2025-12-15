// filepath: sae-backend/src/main.ts
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe, ClassSerializerInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get environment variables
  const port = configService.get<number>("PORT") || 3000;
  const apiPrefix = configService.get<string>("API_PREFIX") || "api";
  const environment = configService.get<string>("NODE_ENV") || "development";

  // Configure CORS
  app.enableCors();

  // Set global prefix
  app.setGlobalPrefix(apiPrefix);

  // Configure global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  // Configure body parser limits for file uploads
  app.use(require("express").json({ limit: "50mb" }));
  app.use(require("express").urlencoded({ limit: "50mb", extended: true }));

  // Configure global interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Configure Swagger documentation
  if (environment !== "production") {
    const config = new DocumentBuilder()
      .setTitle("SAE API")
      .setDescription("API para el Sistema de Administración Empresarial")
      .setVersion("1.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

    logger.log(`Swagger documentation available at /${apiPrefix}/docs`);
  }

  // Start the server
  await app.listen(port);
  logger.log(`Application running on: ${await app.getUrl()}`);
  logger.log(`Environment: ${environment}`);
}

bootstrap();
