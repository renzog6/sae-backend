import { Module } from "@nestjs/common";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { EmployeeVacationsController } from "./employee-vacations.controller";
import { HistoryModule } from "../../history/history.module";

@Module({
  imports: [HistoryModule],
  controllers: [EmployeeVacationsController],
  providers: [EmployeeVacationsService],
})
export class EmployeeVacationsModule {}
