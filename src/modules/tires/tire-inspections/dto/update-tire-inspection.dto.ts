import { PartialType } from "@nestjs/mapped-types";
import { CreateTireInspectionDto } from "./create-tire-inspection.dto";

export class UpdateTireInspectionDto extends PartialType(CreateTireInspectionDto) { }
