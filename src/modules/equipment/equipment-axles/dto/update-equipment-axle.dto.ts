import { PartialType } from "@nestjs/swagger";
import { CreateEquipmentAxleDto } from "./create-equipment-axle.dto";

export class UpdateEquipmentAxleDto extends PartialType(CreateEquipmentAxleDto) { }
