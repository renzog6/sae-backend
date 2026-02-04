import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTireInspectionDto } from "./create-tire-inspection.dto";

@InputType()
export class UpdateTireInspectionDto extends PartialType(CreateTireInspectionDto) { }
