import { PartialType } from "@nestjs/mapped-types";
import { CreateTireSizeDto } from "./create-tire-size.dto";

export class UpdateTireSizeDto extends PartialType(CreateTireSizeDto) { }
