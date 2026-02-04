// filepath: sae-backend/src/modules/tires/tire-positions/dto/update-tire-position.dto.ts
import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTirePositionDto } from "./create-tire-position.dto";

@InputType()
export class UpdateTirePositionDto extends PartialType(CreateTirePositionDto) {}
