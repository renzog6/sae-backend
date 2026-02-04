import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTireRecapDto } from "./create-tire-recap.dto";

@InputType()
export class UpdateTireRecapDto extends PartialType(CreateTireRecapDto) { }
