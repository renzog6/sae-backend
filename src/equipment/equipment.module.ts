// filepath: sae-backend/src/equipment/equipment.module.ts
import { Module } from "@nestjs/common";
import { EquipmentService } from "./services/equipment.service";
import { EquipmentController } from "./controllers/equipment.controller";
import { EquipmentCategoryService } from "./services/equipment-category.service";
import { EquipmentCategoryController } from "./controllers/equipment-category.controller";
import { EquipmentTypeService } from "./services/equipment-type.services";
import { EquipmentTypeController } from "./controllers/equipment-type.controller";
import { EquipmentModelService } from "./services/equipment-model.service";
import { EquipmentModelController } from "./controllers/equipment-model.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { EquipmentAxlesController } from "./controllers/equipment-axles.controller";
import { EquipmentAxlesService } from "./services/equipment-axles.service";

@Module({
  imports: [PrismaModule],
  controllers: [
    EquipmentAxlesController,
    EquipmentCategoryController,
    EquipmentTypeController,
    EquipmentModelController,
    EquipmentController,
  ],
  providers: [
    EquipmentAxlesService,
    EquipmentCategoryService,
    EquipmentTypeService,
    EquipmentModelService,
    EquipmentService,
  ],
  exports: [
    EquipmentAxlesService,
    EquipmentCategoryService,
    EquipmentTypeService,
    EquipmentModelService,
    EquipmentService,
  ],
})
export class EquipmentModule {}
