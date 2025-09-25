import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { BusinessCategoriesModule } from './companies/business-categories/business-categories.module';
import { BusinessSubcategoriesModule } from './companies/business-subcategories/business-subcategories.module';
import { ContactsModule } from './contacts/contacts.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EmployeesModule } from './employees/employees.module';
import { LocationsModule } from './locations/locations.module';
import { InspectionsModule } from './inspections/inspections.module';
import { HealthModule } from './health/health.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { PersonsModule } from './persons/persons.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Rate limiting protection
    ThrottlerModule.forRoot([{
      ttl: 60000, // time in milliseconds
      limit: 10, // maximum number of requests in the ttl period
    }]),
    
    // Database module
    PrismaModule,
    
    // Feature modules
    AuthModule,
    UsersModule,
    CompaniesModule,
    BusinessCategoriesModule,
    BusinessSubcategoriesModule,
    ContactsModule,
    
    // Feature modules
    EquipmentModule,
    EmployeesModule,
    LocationsModule,
    InspectionsModule,
    HealthModule,
    CatalogsModule,
    PersonsModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}