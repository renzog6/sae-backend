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

@Module({
  imports: [PrismaModule],
  controllers: [
    EquipmentController,
    EquipmentCategoryController,
    EquipmentTypeController,
    EquipmentModelController,
  ],
  providers: [
    EquipmentService,
    EquipmentCategoryService,
    EquipmentTypeService,
    EquipmentModelService,
  ],
  exports: [
    EquipmentService,
    EquipmentCategoryService,
    EquipmentTypeService,
    EquipmentModelService,
  ],
})
export class EquipmentModule {}
