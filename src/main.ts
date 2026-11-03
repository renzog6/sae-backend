// filepath: sae-backend/src/main.ts
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe, ClassSerializerInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { AllExceptionsFilter } from "@common/filters/prisma-exception.filter";
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
  // Lista blanca por variable de entorno (`CORS_ORIGINS`, separada por comas).
  // Antes era `enableCors()` sin argumentos, que refleja cualquier origen: cualquier
  // sitio podía invocar la API desde el navegador del usuario.
  const corsEnv = configService.get<string>("CORS_ORIGINS");
  const allowedOrigins = (corsEnv ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (allowedOrigins.length === 0) {
    allowedOrigins.push("http://localhost:3003");
    if (environment === "production") {
      logger.warn(
        "CORS_ORIGINS no está definido: se permite sólo http://localhost:3003. " +
          "Configurá CORS_ORIGINS con los orígenes reales del frontend."
      );
    }
  }

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  });

  logger.log(`CORS permitido para: ${allowedOrigins.join(", ")}`);

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

  // Usar el filtro global
  app.useGlobalFilters(new AllExceptionsFilter());

  // Start the server
  await app.listen(port);
  logger.log(`Application running on: ${await app.getUrl()}`);
  logger.log(`Environment: ${environment}`);
}

bootstrap();
