// filepath: sae-backend/src/modules/companies/business-categories/dto/create-business-category.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBusinessCategoryDto {
  @ApiProperty({
    description: "Nombre de la categoría",
    example: "Construcción",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Código único",
    required: false,
    example: "CONST",
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: "Información adicional",
    required: false,
  })
  @IsString()
  @IsOptional()
  information?: string;

  @ApiProperty({
    description: "Estado activo",
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: "Fecha de eliminación (para soft delete)",
    required: false,
    example: "2024-01-01T00:00:00.000Z",
  })
  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}
