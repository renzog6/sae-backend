import { Module } from "@nestjs/common";
import { EquipmentMaintenanceService } from "./equipment-maintenance.service";
import { EquipmentMaintenanceController } from "./equipment-maintenance.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { HistoryModule } from "@modules/history/history.module";

import { EquipmentMaintenanceResolver } from "./equipment-maintenance.resolver";

@Module({
    imports: [PrismaModule, HistoryModule],
    controllers: [EquipmentMaintenanceController],
    providers: [EquipmentMaintenanceService, EquipmentMaintenanceResolver],
    exports: [EquipmentMaintenanceService],
})
export class EquipmentMaintenanceModule { }

