import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEquipmentCategoryDto } from "./create-equipment-category.dto";

@InputType()
export class UpdateEquipmentCategoryDto extends PartialType(CreateEquipmentCategoryDto) { }
