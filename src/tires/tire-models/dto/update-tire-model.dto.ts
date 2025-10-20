//filepath: sae-backend/src/tires/tire-models/dto/update-tire-model.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateTireModelDto } from "./create-tire-model.dto";

export class UpdateTireModelDto extends PartialType(CreateTireModelDto) {}
