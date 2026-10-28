// filepath: sae-backend/src/app.module.ts
import { join } from "path";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { UsersModule } from "./modules/users/users.module";
import { CompaniesModule } from "./modules/companies/companies.module";
import { ContactsModule } from "./modules/contacts/contacts.module";
import { EquipmentModule } from "./modules/equipment/equipment.module";
import { EmployeesModule } from "./modules/employees/employees.module";
import { LocationsModule } from "./modules/locations/locations.module";
import { InspectionsModule } from "./modules/inspections/inspections.module";
import { HealthModule } from "./modules/health/health.module";
import { CatalogsModule } from "./modules/catalogs/catalogs.module";
import { PersonsModule } from "./modules/persons/persons.module";
import { ServerFilesModule } from "./server-files/server-files.module";
import { HistoryModule } from "./modules/history/history.module";
import { TiresModule } from "./modules/tires/tires.module";
import { LoggerMiddleware } from "@common/logger/logger.middleware";
import { ReportsModule } from "@reports/reports.module";
import { ValidatorsModule } from "@modules/validators/validators.module";

@Module({
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, "..", ".env"),
    }),

    // Rate limiting protection
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // time in milliseconds
        limit: 10, // maximum number of requests in the ttl period
      },
    ]),

    // Database module
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    CompaniesModule,
    ContactsModule,
    EquipmentModule,
    EmployeesModule,
    LocationsModule,
    InspectionsModule,
    HealthModule,
    CatalogsModule,
    PersonsModule,
    ServerFilesModule,
    HistoryModule,
    TiresModule,
    ReportsModule,
    ValidatorsModule,
  ],
  controllers: [],
  providers: [
    // Autenticación por defecto en TODA la aplicación (fail-closed).
    // Para abrir una ruta hay que marcarla explícitamente con @Public().
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Express 5 (Nest 11) no acepta el comodín suelto "*": hay que nombrarlo.
    consumer.apply(LoggerMiddleware).forRoutes("{*splat}");
  }
}
