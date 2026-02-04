import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEquipmentTypeDto } from "./create-equipment-type.dto";

@InputType()
export class UpdateEquipmentTypeDto extends PartialType(CreateEquipmentTypeDto) { }
