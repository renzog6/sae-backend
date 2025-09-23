// filepath: sae-backend/src/companies/business-subcategories/dto/update-business-subcategory.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBusinessSubCategoryDto {
  @ApiProperty({ description: 'Nombre de la subcategoría', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Descripción', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID de categoría padre', required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  businessCategoryId?: number;
}
