import { Module } from '@nestjs/common';
import { EmployeeCategoriesService } from './employee-categories.service';
import { EmployeeCategoriesController } from './employee-categories.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeCategoriesController],
  providers: [EmployeeCategoriesService],
  exports: [EmployeeCategoriesService],
})
export class EmployeeCategoriesModule { }
