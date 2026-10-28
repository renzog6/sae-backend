import { PartialType } from "@nestjs/mapped-types";
import { CreateTireRotationDto } from "./create-tire-rotation.dto";

export class UpdateTireRotationDto extends PartialType(CreateTireRotationDto) { }
