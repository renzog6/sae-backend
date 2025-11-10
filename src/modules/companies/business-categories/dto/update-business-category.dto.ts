// filepath: sae-backend/src/modules/companies/business-categories/dto/update-business-category.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateBusinessCategoryDto {
  @ApiProperty({ description: "Nombre de la categoría", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: "Código único", required: false })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: "Información adicional", required: false })
  @IsString()
  @IsOptional()
  information?: string;
}
