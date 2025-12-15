import { BaseController } from "@common/controllers/base.controller";

import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

import { EquipmentTypeService } from "./equipment-type.service";
import { EquipmentType } from "./entity/equipment-type.entity";

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
  @ApiOperation({
    summary: "Get equipment types by category",
    description:
      "Retrieves all equipment types that belong to the specified category.",
  })
  @ApiParam({
    name: "categoryId",
    type: "number",
    description: "Unique identifier of the equipment category",
  })
  @ApiResponse({
    status: 200,
    description: "List of equipment types for the specified category.",
  })
  @ApiResponse({ status: 404, description: "Equipment category not found" })
  findByCategory(@Param("categoryId") categoryId: string) {
    return this.equipmentTypeService.findByCategory(+categoryId);
  }
}
