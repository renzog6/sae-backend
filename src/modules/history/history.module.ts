// filepath: sae-backend/src/modules/history/history.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EmployeesModule } from "../employees/employees.module";
import { CompaniesModule } from "../companies/companies.module";
import { EquipmentModule } from "../equipment/equipment.module";
import { HistoryLogService } from "./services/history-log.service";
import { HistoryLogController } from "./controllers/history-log.controller";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => EmployeesModule),
    CompaniesModule,
    forwardRef(() => EquipmentModule),
  ],
  providers: [HistoryLogService],
  controllers: [HistoryLogController],
  exports: [HistoryLogService],
})
export class HistoryModule {}
