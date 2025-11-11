//filepath: sae-backend/src/modules/employees/employee-vacations/employee-vacations.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { EmployeeVacationsController } from "./employee-vacations.controller";
import { HistoryModule } from "../../history/history.module";

@Module({
  imports: [forwardRef(() => HistoryModule)],
  controllers: [EmployeeVacationsController],
  providers: [EmployeeVacationsService],
})
export class EmployeeVacationsModule {}
