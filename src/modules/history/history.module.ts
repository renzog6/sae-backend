import { Module, forwardRef } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { EmployeesModule } from "@modules/employees/employees.module";
import { CompaniesModule } from "@modules/companies/companies.module";
import { EquipmentModule } from "@modules/equipment/equipment.module";
import { HistoryLogService } from "@modules/history/services/history-log.service";
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
