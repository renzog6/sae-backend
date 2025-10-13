// file: sae-backend/src/history/controllers/equipment-maintenance.controller.ts
import { Controller, Post, Param, Body } from "@nestjs/common";
import { EquipmentMaintenanceService } from "../services/equipment-maintenance.service";
import { HistoryLogService } from "../services/history-log.service";
import { CreateEquipmentMaintenanceDto } from "../dto/create-equipment-maintenance.dto";

@Controller("equipment/:equipmentId/history")
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
