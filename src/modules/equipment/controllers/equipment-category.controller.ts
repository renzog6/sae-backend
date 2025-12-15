// filepath: sae-backend/src/modules/equipment/controllers/equipment-category.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { EquipmentCategoryService } from "../services/equipment-category.service";
import { EquipmentCategory } from "../entities/equipment-category.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-categories")
@ApiBearerAuth()
@Controller("equipments/categories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EquipmentCategoryController extends BaseController<EquipmentCategory> {
  constructor(
    private readonly equipmentCategoryService: EquipmentCategoryService
  ) {
    super(equipmentCategoryService, EquipmentCategory, "EquipmentCategory");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }
}
