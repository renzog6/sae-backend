//filepath: sae-backend/src/tires/tire-sizes/dto/update-tire-size.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateTireSizeDto } from "./create-tire-size.dto";

export class UpdateTireSizeDto extends PartialType(CreateTireSizeDto) {}
