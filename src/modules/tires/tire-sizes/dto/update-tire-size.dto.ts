import { PartialType } from "@nestjs/swagger";
import { CreateTireSizeDto } from "./create-tire-size.dto";

export class UpdateTireSizeDto extends PartialType(CreateTireSizeDto) { }
