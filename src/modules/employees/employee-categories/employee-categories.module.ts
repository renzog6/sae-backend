import { Module } from '@nestjs/common';
import { EmployeeCategoriesService } from './employee-categories.service';
import { EmployeeCategoriesController } from './employee-categories.controller';
import { EmployeeCategoriesResolver } from './employee-categories.resolver';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeCategoriesController],
  providers: [EmployeeCategoriesService, EmployeeCategoriesResolver],
  exports: [EmployeeCategoriesService],
})
export class EmployeeCategoriesModule { }
