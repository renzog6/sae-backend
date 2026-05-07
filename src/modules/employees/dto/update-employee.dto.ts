// filepath: sae-backend/src/modules/employees/dto/update-employee.dto.ts
import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEmployeeDto } from "./create-employee.dto";

@InputType()
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
