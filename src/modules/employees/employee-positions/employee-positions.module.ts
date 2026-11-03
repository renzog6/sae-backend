import { Module } from '@nestjs/common';
import { EmployeePositionsService } from './employee-positions.service';
import { EmployeePositionsController } from './employee-positions.controller';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeePositionsController],
  providers: [EmployeePositionsService],
  exports: [EmployeePositionsService],
})
export class EmployeePositionsModule { }
