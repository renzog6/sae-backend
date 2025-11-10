//filepath: sae-backend/src/tires/dto/update-tire.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateTireDto } from "./create-tire.dto";

export class UpdateTireDto extends PartialType(CreateTireDto) {}
