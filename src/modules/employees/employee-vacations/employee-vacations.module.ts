//filepath: sae-backend/src/modules/employees/employee-vacations/employee-vacations.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { EmployeeVacationsController } from "./employee-vacations.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { HistoryModule } from "../../history/history.module";

@Module({
  imports: [PrismaModule, forwardRef(() => HistoryModule)],
  controllers: [EmployeeVacationsController],
  providers: [EmployeeVacationsService],
  exports: [EmployeeVacationsService],
})
export class EmployeeVacationsModule {}
