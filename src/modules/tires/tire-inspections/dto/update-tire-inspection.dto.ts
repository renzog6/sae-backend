import { PartialType } from "@nestjs/swagger";
import { CreateTireInspectionDto } from "./create-tire-inspection.dto";

export class UpdateTireInspectionDto extends PartialType(CreateTireInspectionDto) { }
