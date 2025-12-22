//filepath: sae-backend/src/modules/equipment/equipment.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { EquipmentService } from "./equipment.service";
import { EquipmentController } from "./equipment.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { HistoryModule } from "../history/history.module";
import { EquipmentAxlesModule } from "./equipment-axles/equipment-axles.module";
import { EquipmentCategoriesModule } from "./equipment-categories/equipment-categories.module";
import { EquipmentMaintenanceModule } from "./equipment-maintenance/equipment-maintenance.module";
import { EquipmentModelsModule } from "./equipment-models/equipment-models.module";
import { EquipmentTransactionModule } from "./equipment-transaction/equipment-transaction.module";
import { EquipmentTypesModule } from "./equipment-types/equipment-types.module";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => HistoryModule),
    EquipmentAxlesModule,
    EquipmentCategoriesModule,
    EquipmentMaintenanceModule,
    EquipmentModelsModule,
    EquipmentTransactionModule,
    EquipmentTypesModule,
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [
    EquipmentService,
    EquipmentAxlesModule,
    EquipmentCategoriesModule,
    EquipmentMaintenanceModule,
    EquipmentModelsModule,
    EquipmentTransactionModule,
    EquipmentTypesModule,
  ],
})
export class EquipmentModule {}
