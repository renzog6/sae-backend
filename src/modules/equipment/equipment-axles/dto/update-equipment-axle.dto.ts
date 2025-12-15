// filepath: sae-backend/src/modules/equipment/dto/update-equipment-axle.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateEquipmentAxleDto } from "./create-equipment-axle.dto";

export class UpdateEquipmentAxleDto extends PartialType(
  CreateEquipmentAxleDto
) {}
