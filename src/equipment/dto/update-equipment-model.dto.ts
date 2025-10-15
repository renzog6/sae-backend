import { PartialType } from "@nestjs/swagger";
import { CreateEquipmentModelDto } from "./create-equipment-model.dto";

export class UpdateEquipmentModelDto extends PartialType(
  CreateEquipmentModelDto
) {}
