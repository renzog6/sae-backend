import { PartialType } from "@nestjs/swagger";
import { CreateTireRotationDto } from "./create-tire-rotation.dto";

export class UpdateTireRotationDto extends PartialType(CreateTireRotationDto) { }
