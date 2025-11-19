import { Module, forwardRef } from "@nestjs/common";
import { EmployeesService } from "./services/employees.service";
import { EmployeesController } from "./controllers/employees.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { EmployeeVacationsModule } from "./employee-vacations/employee-vacations.module";
import { EmployeePositionsModule } from "./employee-positions/employee-positions.module";
import { EmployeeCategoriesModule } from "./employee-categories/employee-categories.module";
import { HistoryModule } from "../history/history.module";
import { EmployeeIncidentController } from "./controllers/employee-incident.controller";
import { EmployeeIncidentService } from "./services/employee-incident.service";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => HistoryModule),
    forwardRef(() => EmployeeVacationsModule),
    EmployeePositionsModule,
    EmployeeCategoriesModule,
  ],
  controllers: [EmployeesController, EmployeeIncidentController],
  providers: [EmployeesService, EmployeeIncidentService],
  exports: [EmployeesService, EmployeeIncidentService],
})
export class EmployeesModule {}
