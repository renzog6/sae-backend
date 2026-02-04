import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEquipmentMaintenanceDto } from "./create-equipment-maintenance.dto";

@InputType()
export class UpdateEquipmentMaintenanceDto extends PartialType(CreateEquipmentMaintenanceDto) { }
