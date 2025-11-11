// filepath: sae-backend/src/modules/equipment/controllers/equipment-maintenance.controller.ts
import { Controller, Post, Param, Body } from "@nestjs/common";
import { EquipmentMaintenanceService } from "../services/equipment-maintenance.service";
import { HistoryLogService } from "../../history/services/history-log.service";
import { CreateEquipmentMaintenanceDto } from "../dto/create-equipment-maintenance.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("equipment-maintenance")
@Controller("equipment/:id/history-maintenance")
export class EquipmentMaintenanceController {
  constructor(
    private equipmentMaintenanceService: EquipmentMaintenanceService,
    private historyLogService: HistoryLogService
  ) {}

  @Post("maintenance")
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
