import { InputType, PartialType } from "@nestjs/graphql";
import { CreateUnitDto } from "./create-unit.dto";

@InputType()
export class UpdateUnitDto extends PartialType(CreateUnitDto) { }
