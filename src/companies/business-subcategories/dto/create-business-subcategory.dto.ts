// filepath: sae-backend/src/companies/business-subcategories/dto/create-business-subcategory.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBusinessSubCategoryDto {
  @ApiProperty({ description: 'Nombre de la subcategoría', example: 'Obra civil' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descripción', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID de categoría padre', example: 1 })
  @IsInt()
  @Type(() => Number)
  businessCategoryId: number;
}
