import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEquipmentAxleDto } from "./create-equipment-axle.dto";

@InputType()
export class UpdateEquipmentAxleDto extends PartialType(CreateEquipmentAxleDto) { }
