import { PartialType } from "@nestjs/mapped-types";
import { CreateTireRecapDto } from "./create-tire-recap.dto";

export class UpdateTireRecapDto extends PartialType(CreateTireRecapDto) { }
