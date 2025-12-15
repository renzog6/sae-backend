import { Module } from "@nestjs/common";
import { EquipmentMaintenanceService } from "./equipment-maintenance.service";
import { EquipmentMaintenanceController } from "./equipment-maintenance.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { HistoryModule } from "@modules/history/history.module";

@Module({
    imports: [PrismaModule, HistoryModule],
    controllers: [EquipmentMaintenanceController],
    providers: [EquipmentMaintenanceService],
    exports: [EquipmentMaintenanceService],
})
export class EquipmentMaintenanceModule { }

