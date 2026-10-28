import { PartialType } from "@nestjs/mapped-types";
import { CreateTireModelDto } from "./create-tire-model.dto";

export class UpdateTireModelDto extends PartialType(CreateTireModelDto) { }
