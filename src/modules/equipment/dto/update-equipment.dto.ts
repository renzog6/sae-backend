import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEquipmentDto } from "./create-equipment.dto";

@InputType()
export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) { }
