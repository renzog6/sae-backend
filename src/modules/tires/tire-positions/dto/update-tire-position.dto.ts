// filepath: sae-backend/src/modules/tires/tire-positions/dto/update-tire-position.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateTirePositionDto } from "./create-tire-position.dto";

export class UpdateTirePositionDto extends PartialType(CreateTirePositionDto) {}
