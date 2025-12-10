import { BaseController } from "@common/controllers/base.controller";

import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

import { EquipmentModelService } from "../services/equipment-model.service";
import { EquipmentModel } from "../entities/equipment-model.entity";

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
  @ApiOperation({ summary: "Get equipment models by type" })
  @ApiResponse({
    status: 200,
    description: "Return equipment models for the type.",
  })
  findByType(@Param("typeId") typeId: string) {
    return this.equipmentModelService.findByType(+typeId);
  }
}
