import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTireRotationDto } from "./create-tire-rotation.dto";

@InputType()
export class UpdateTireRotationDto extends PartialType(CreateTireRotationDto) { }
