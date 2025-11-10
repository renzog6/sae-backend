//filepath: sae-backend/src/modules/employees/employee-categories/dto/update-employee-category.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateEmployeeCategoryDto } from "./create-employee-category.dto";

export class UpdateEmployeeCategoryDto extends PartialType(
  CreateEmployeeCategoryDto
) {}
