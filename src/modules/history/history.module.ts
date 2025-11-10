// filepath: sae-backend/src/modules/history/history.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EmployeesModule } from "../employees/employees.module";
import { CompaniesModule } from "../companies/companies.module";
import { EquipmentModule } from "../equipment/equipment.module";
import { HistoryLogService } from "./services/history-log.service";
import { EmployeeIncidentService } from "./services/employee-incident.service";
import { EquipmentMaintenanceService } from "./services/equipment-maintenance.service";
import { HistoryLogController } from "./controllers/history-log.controller";
import { EmployeeIncidentController } from "./controllers/employee-incident.controller";
import { EquipmentMaintenanceController } from "./controllers/equipment-maintenance.controller";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => EmployeesModule),
    CompaniesModule,
    EquipmentModule,
  ],
  providers: [
    HistoryLogService,
    EmployeeIncidentService,
    EquipmentMaintenanceService,
  ],
  controllers: [
    HistoryLogController,
    EmployeeIncidentController,
    EquipmentMaintenanceController,
  ],
  exports: [
    HistoryLogService,
    EmployeeIncidentService,
    EquipmentMaintenanceService,
  ],
})
export class HistoryModule {}
