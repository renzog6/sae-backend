import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTireDto } from "./create-tire.dto";

@InputType()
export class UpdateTireDto extends PartialType(CreateTireDto) { }
