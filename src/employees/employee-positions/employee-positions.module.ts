import { Module } from '@nestjs/common';
import { EmployeePositionsService } from './employee-positions.service';
import { EmployeePositionsController } from './employee-positions.controller';

@Module({
  controllers: [EmployeePositionsController],
  providers: [EmployeePositionsService],
})
export class EmployeePositionsModule {}
