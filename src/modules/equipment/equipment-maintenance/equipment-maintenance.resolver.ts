import { Resolver } from "@nestjs/graphql";
import { EquipmentMaintenanceService } from "./equipment-maintenance.service";
import { EquipmentMaintenance } from "./entity/equipment-maintenance.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { CreateEquipmentMaintenanceDto } from "./dto/create-equipment-maintenance.dto";
import { UpdateEquipmentMaintenanceDto } from "./dto/update-equipment-maintenance.dto";

@Resolver(() => EquipmentMaintenance)
export class EquipmentMaintenanceResolver extends BaseResolver(EquipmentMaintenance, {
    createInput: CreateEquipmentMaintenanceDto,
    updateInput: UpdateEquipmentMaintenanceDto,
}) {
    constructor(private readonly equipmentMaintenanceService: EquipmentMaintenanceService) {
        super(equipmentMaintenanceService);
    }
}
