import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTireModelDto } from "./create-tire-model.dto";

@InputType()
export class UpdateTireModelDto extends PartialType(CreateTireModelDto) { }
