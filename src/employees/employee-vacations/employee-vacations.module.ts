import { Module } from '@nestjs/common';
import { EmployeeVacationsService } from './employee-vacations.service';
import { EmployeeVacationsController } from './employee-vacations.controller';

@Module({
  controllers: [EmployeeVacationsController],
  providers: [EmployeeVacationsService],
})
export class EmployeeVacationsModule {}
