import { Module } from '@nestjs/common';
import { EmployeePositionsService } from './employee-positions.service';
import { EmployeePositionsController } from './employee-positions.controller';
import { EmployeePositionsResolver } from './employee-positions.resolver';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeePositionsController],
  providers: [EmployeePositionsService, EmployeePositionsResolver],
  exports: [EmployeePositionsService],
})
export class EmployeePositionsModule { }
