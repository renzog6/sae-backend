import { PartialType } from "@nestjs/mapped-types";
import { CreateEquipmentMaintenanceDto } from "./create-equipment-maintenance.dto";

export class UpdateEquipmentMaintenanceDto extends PartialType(CreateEquipmentMaintenanceDto) { }
