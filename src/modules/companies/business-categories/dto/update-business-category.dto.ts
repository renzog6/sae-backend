// filepath: sae-backend/src/modules/companies/business-categories/dto/update-business-category.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateBusinessCategoryDto } from "./create-business-category.dto";

export class UpdateBusinessCategoryDto extends PartialType(
  CreateBusinessCategoryDto
) {}
