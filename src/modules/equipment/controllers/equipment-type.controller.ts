import { BaseController } from "@common/controllers/base.controller";

import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

import { EquipmentTypeService } from "../services/equipment-type.services";
import { EquipmentType } from "../entities/equipment-type.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-types")
@ApiBearerAuth()
@Controller("equipments/types")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EquipmentTypeController extends BaseController<EquipmentType> {
  constructor(private readonly equipmentTypeService: EquipmentTypeService) {
    super(equipmentTypeService, EquipmentType, "EquipmentType");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }

  @Get("category/:categoryId")
  @ApiOperation({ summary: "Get equipment types by category" })
  @ApiResponse({
    status: 200,
    description: "Return equipment types for the category.",
  })
  findByCategory(@Param("categoryId") categoryId: string) {
    return this.equipmentTypeService.findByCategory(+categoryId);
  }
}
