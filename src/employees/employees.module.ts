import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EmployeeVacationsModule } from './employee-vacations/employee-vacations.module';
import { EmployeePositionsModule } from './employee-positions/employee-positions.module';
import { EmployeeCategoriesModule } from './employee-categories/employee-categories.module';

@Module({
  imports: [PrismaModule, EmployeeVacationsModule, EmployeePositionsModule, EmployeeCategoriesModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}