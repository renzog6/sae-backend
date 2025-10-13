import { Module, forwardRef } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { EmployeesController } from "./employees.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { EmployeeVacationsModule } from "./employee-vacations/employee-vacations.module";
import { EmployeePositionsModule } from "./employee-positions/employee-positions.module";
import { EmployeeCategoriesModule } from "./employee-categories/employee-categories.module";
import { HistoryModule } from "../history/history.module";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => HistoryModule),
    EmployeeVacationsModule,
    EmployeePositionsModule,
    EmployeeCategoriesModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
