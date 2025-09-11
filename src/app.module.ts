import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ContactsModule } from './contacts/contacts.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EmployeesModule } from './employees/employees.module';
import { LocationsModule } from './locations/locations.module';
import { InspectionsModule } from './inspections/inspections.module';

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
    ContactsModule,
    
    // Feature modules
    EquipmentModule,
    EmployeesModule,
    LocationsModule,
    InspectionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}