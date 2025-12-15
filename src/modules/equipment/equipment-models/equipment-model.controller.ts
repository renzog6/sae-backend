import { BaseController } from "@common/controllers/base.controller";

import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

import { EquipmentModelService } from "./equipment-model.service";
import { EquipmentModel } from "./entity/equipment-model.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-models")
@ApiBearerAuth()
@Controller("equipments/models")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EquipmentModelController extends BaseController<EquipmentModel> {
  constructor(private readonly equipmentModelService: EquipmentModelService) {
    super(equipmentModelService, EquipmentModel, "EquipmentModel");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }

  @Get("type/:typeId")
  @ApiOperation({
    summary: "Get equipment models by type",
    description:
      "Retrieves all equipment models that belong to the specified equipment type.",
  })
  @ApiParam({
    name: "typeId",
    type: "number",
    description: "Unique identifier of the equipment type",
  })
  @ApiResponse({
    status: 200,
    description: "List of equipment models for the specified type.",
  })
  @ApiResponse({ status: 404, description: "Equipment type not found" })
  findByType(@Param("typeId") typeId: string) {
    return this.equipmentModelService.findByType(+typeId);
  }
}
