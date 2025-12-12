// filepath: sae-backend/src/modules/equipment/controllers/equipment-maintenance.controller.ts
import { Controller, Post, Param, Body } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { EquipmentMaintenanceService } from "../services/equipment-maintenance.service";
import { HistoryLogService } from "../../history/services/history-log.service";
import { CreateEquipmentMaintenanceDto } from "../dto/create-equipment-maintenance.dto";

@ApiTags("equipment-maintenance")
@Controller("equipment/:id/history-maintenance")
export class EquipmentMaintenanceController {
  constructor(
    private equipmentMaintenanceService: EquipmentMaintenanceService,
    private historyLogService: HistoryLogService
  ) {}

  @Post("maintenance")
  @ApiOperation({
    summary: "Create equipment maintenance record",
    description:
      "Creates a new maintenance record for the specified equipment with the provided details.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the equipment",
  })
  @ApiBody({ type: CreateEquipmentMaintenanceDto })
  @ApiResponse({
    status: 201,
    description: "Equipment maintenance record created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Equipment not found" })
  async createMaintenance(
    @Param("equipmentId") equipmentId: string,
    @Body() createMaintenanceDto: CreateEquipmentMaintenanceDto
  ) {
    return this.equipmentMaintenanceService.createMaintenance({
      ...createMaintenanceDto,
      equipmentId: parseInt(equipmentId),
    });
  }
}
