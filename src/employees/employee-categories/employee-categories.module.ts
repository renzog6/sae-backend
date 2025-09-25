import { Module } from '@nestjs/common';
import { EmployeeCategoriesService } from './employee-categories.service';
import { EmployeeCategoriesController } from './employee-categories.controller';

@Module({
  controllers: [EmployeeCategoriesController],
  providers: [EmployeeCategoriesService],
})
export class EmployeeCategoriesModule {}
