import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { HistoryLogService } from "../../history/services/history-log.service";
import { CreateEquipmentMaintenanceDto } from "./dto/create-equipment-maintenance.dto";
import { MaintenanceType, HistoryType } from "@prisma/client";
import { EquipmentMaintenance } from "./entity/equipment-maintenance.entity";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class EquipmentMaintenanceService extends BaseService<EquipmentMaintenance> {
  constructor(
    protected prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipmentMaintenance;
  }

  protected buildSearchConditions(q: string) {
    return [
      { description: { contains: q } },
      { technician: { contains: q } }
    ];
  }

  // Renaming createMaintenance to create to match BaseService
  async create(createMaintenanceDto: CreateEquipmentMaintenanceDto) {
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
    return mapping[maintenanceType] as HistoryType || HistoryType.EQUIPMENT_MAINTENANCE;
  }

  override async findAll(query: BaseQueryDto = new BaseQueryDto()): Promise<BaseResponseDto<any>> {
    // Include equipment relation by default
    const include = { equipment: true };
    return super.findAll(query, {}, include);
  }
}

