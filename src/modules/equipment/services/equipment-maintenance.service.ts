// filepath: sae-backend/src/modules/equipment/services/equipment-maintenance.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { HistoryLogService } from "../../history/services/history-log.service";
import { CreateEquipmentMaintenanceDto } from "../dto/create-equipment-maintenance.dto";
import { MaintenanceType, HistoryType } from "@prisma/client";

@Injectable()
export class EquipmentMaintenanceService {
  constructor(
    private prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {}

  async createMaintenance(createMaintenanceDto: CreateEquipmentMaintenanceDto) {
    // Crear mantenimiento
    const maintenance = await this.prisma.equipmentMaintenance.create({
      data: createMaintenanceDto,
      include: { equipment: true },
    });

    // Crear log automático en historial general
    await this.historyLogService.createLog({
      title: `Mantenimiento: ${maintenance.type}`,
      description: maintenance.description,
      type: this.mapToHistoryType(maintenance.type),
      severity: "INFO",
      eventDate: maintenance.startDate,
      equipmentId: maintenance.equipmentId,
      metadata: JSON.stringify({
        maintenanceId: maintenance.id,
        cost: maintenance.cost,
        technician: maintenance.technician,
        warranty: maintenance.warranty,
      }),
    });

    return { data: maintenance };
  }

  private mapToHistoryType(maintenanceType: MaintenanceType): HistoryType {
    const mapping = {
      PREVENTIVE: "EQUIPMENT_MAINTENANCE",
      CORRECTIVE: "EQUIPMENT_MAINTENANCE",
      ACCIDENT_REPAIR: "EQUIPMENT_ACCIDENT",
      ROUTINE_CHECK: "EQUIPMENT_MAINTENANCE",
    };
    return mapping[maintenanceType] as HistoryType;
  }
}
