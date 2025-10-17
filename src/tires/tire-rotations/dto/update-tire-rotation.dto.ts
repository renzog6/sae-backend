//filepath: sae-backend/src/tires/tire-rotations/dto/update-tire-rotation.dto.ts
import { PartialType } from "@nestjs/mapped-types";
import { CreateTireRotationDto } from "./create-tire-rotation.dto";

export class UpdateTireRotationDto extends PartialType(CreateTireRotationDto) {}
