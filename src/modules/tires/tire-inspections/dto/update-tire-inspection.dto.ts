//filepath: sae-backend/src/tires/tire-inspections/dto/update-tire-inspection.dto.ts
import { PartialType } from "@nestjs/mapped-types";
import { CreateTireInspectionDto } from "./create-tire-inspection.dto";

export class UpdateTireInspectionDto extends PartialType(
  CreateTireInspectionDto
) {}
