import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTireSizeDto } from "./create-tire-size.dto";

@InputType()
export class UpdateTireSizeDto extends PartialType(CreateTireSizeDto) { }
