// filepath: sae-backend/src/app.module.ts
import { join } from "path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
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
import { DocumentsModule } from "./modules/documents/documents.module";
import { HistoryModule } from "./modules/history/history.module";
import { TiresModule } from "./modules/tires/tires.module";

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
    DocumentsModule,
    HistoryModule,
    TiresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
