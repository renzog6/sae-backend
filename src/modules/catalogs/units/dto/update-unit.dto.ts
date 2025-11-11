//filepath: sae-backend/src/modules/catalogs/units/dto/update-unit.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateUnitDto } from "./create-unit.dto";

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}
