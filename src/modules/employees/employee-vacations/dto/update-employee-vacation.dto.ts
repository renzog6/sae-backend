import { PartialType } from "@nestjs/mapped-types";
import { CreateEmployeeVacationDto } from "./create-employee-vacation.dto";

export class UpdateEmployeeVacationDto extends PartialType(CreateEmployeeVacationDto) { }

