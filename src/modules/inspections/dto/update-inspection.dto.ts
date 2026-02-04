import { InputType, PartialType } from "@nestjs/graphql";
import { CreateInspectionDto } from "./create-inspection.dto";

@InputType()
export class UpdateInspectionDto extends PartialType(CreateInspectionDto) { }
