// filepath: sae-backend/src/companies/business-categories/dto/create-business-category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBusinessCategoryDto {
  @ApiProperty({ description: 'Nombre de la categoría', example: 'Construcción' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Código único', required: false, example: 'CONST' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: 'Información adicional', required: false })
  @IsString()
  @IsOptional()
  information?: string;
}
