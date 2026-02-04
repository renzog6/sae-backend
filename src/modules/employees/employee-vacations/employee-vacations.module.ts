//filepath: sae-backend/src/modules/employees/employee-vacations/employee-vacations.module.ts
import { Module } from "@nestjs/common";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { EmployeeVacationsController } from "./employee-vacations.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { HistoryModule } from "../../history/history.module";
import { EmployeeVacationsResolver } from "./employee-vacations.resolver";

@Module({
  imports: [PrismaModule, HistoryModule],
  controllers: [EmployeeVacationsController],
  providers: [EmployeeVacationsService, EmployeeVacationsResolver],
  exports: [EmployeeVacationsService],
})
export class EmployeeVacationsModule { }
