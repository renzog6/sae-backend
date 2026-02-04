import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEmployeeVacationDto } from "./create-employee-vacation.dto";

@InputType()
export class UpdateEmployeeVacationDto extends PartialType(CreateEmployeeVacationDto) { }

