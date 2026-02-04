import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEquipmentModelDto } from "./create-equipment-model.dto";

@InputType()
export class UpdateEquipmentModelDto extends PartialType(CreateEquipmentModelDto) { }
