// Genera openapi.json a partir de la app Nest ya compilada (dist/).
// Se ejecuta con `npm run openapi:export` (que antes hace `npm run build`).
// No abre puerto: crea la app, extrae el documento y la cierra.
const { NestFactory } = require("@nestjs/core");
const { SwaggerModule, DocumentBuilder } = require("@nestjs/swagger");
const { writeFileSync } = require("fs");
const { join } = require("path");

async function main() {
  const { AppModule } = require("../dist/src/app.module");

  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix(process.env.API_PREFIX || "api");

  const config = new DocumentBuilder()
    .setTitle("SAE API")
    .setDescription("API para el Sistema de Administración Empresarial")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const out = join(__dirname, "..", "openapi.json");
  writeFileSync(out, JSON.stringify(document, null, 2) + "\n", "utf8");

  const paths = Object.keys(document.paths || {}).length;
  const schemas = Object.keys(document.components?.schemas || {}).length;
  console.log(`openapi.json generado: ${paths} paths, ${schemas} schemas`);

  await app.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
