// filepath: sae-backend/src/modules/equipment/equipment.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { EquipmentService } from "./services/equipment.service";
import { EquipmentController } from "./controllers/equipment.controller";
import { EquipmentCategoryService } from "./services/equipment-category.service";
import { EquipmentCategoryController } from "./controllers/equipment-category.controller";
import { EquipmentTypeService } from "./services/equipment-type.services";
import { EquipmentTypeController } from "./controllers/equipment-type.controller";
import { EquipmentModelService } from "./services/equipment-model.service";
import { EquipmentModelController } from "./controllers/equipment-model.controller";
import { PrismaModule } from "../../prisma/prisma.module";
import { EquipmentAxlesController } from "./controllers/equipment-axles.controller";
import { EquipmentAxlesService } from "./services/equipment-axles.service";
import { EquipmentMaintenanceController } from "./controllers/equipment-maintenance.controller";
import { EquipmentMaintenanceService } from "./services/equipment-maintenance.service";
import { HistoryModule } from "../history/history.module";

@Module({
  imports: [PrismaModule, forwardRef(() => HistoryModule)],
  controllers: [
    EquipmentMaintenanceController,
    EquipmentAxlesController,
    EquipmentCategoryController,
    EquipmentTypeController,
    EquipmentModelController,
    EquipmentController,
  ],
  providers: [
    EquipmentMaintenanceService,
    EquipmentAxlesService,
    EquipmentCategoryService,
    EquipmentTypeService,
    EquipmentModelService,
    EquipmentService,
  ],
  exports: [
    EquipmentMaintenanceService,
    EquipmentAxlesService,
    EquipmentCategoryService,
    EquipmentTypeService,
    EquipmentModelService,
    EquipmentService,
  ],
})
export class EquipmentModule {}
