//filepath: sae-backend/src/tires/tire-recaps/dto/update-tire-recap.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateTireRecapDto } from "./create-tire-recap.dto";

export class UpdateTireRecapDto extends PartialType(CreateTireRecapDto) {}
