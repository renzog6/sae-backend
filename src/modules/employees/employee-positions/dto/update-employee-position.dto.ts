// filepath: sae-backend/src/modules/employees/employee-positions/dto/update-employee-position.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateEmployeePositionDto } from "./create-employee-position.dto";

export class UpdateEmployeePositionDto extends PartialType(
  CreateEmployeePositionDto
) {}
