import { PartialType } from "@nestjs/mapped-types";
import { CreateEquipmentAxleDto } from "./create-equipment-axle.dto";

export class UpdateEquipmentAxleDto extends PartialType(CreateEquipmentAxleDto) { }
