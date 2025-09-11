import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEquipmentDto {
  @ApiPropertyOptional({ description: 'Equipment name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Equipment number' })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiPropertyOptional({ description: 'Equipment description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Equipment observation' })
  @IsString()
  @IsOptional()
  observation?: string;

  @ApiPropertyOptional({ description: 'Equipment year' })
  @IsString()
  @IsOptional()
  year?: string;

  @ApiPropertyOptional({ description: 'Equipment chassis number' })
  @IsString()
  @IsOptional()
  chassis?: string;

  @ApiPropertyOptional({ description: 'Equipment engine number' })
  @IsString()
  @IsOptional()
  engine?: string;

  @ApiPropertyOptional({ description: 'Equipment license plate' })
  @IsString()
  @IsOptional()
  licensePlate?: string;

  @ApiPropertyOptional({ description: 'Equipment color' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ description: 'Additional information' })
  @IsString()
  @IsOptional()
  information?: string;

  @ApiPropertyOptional({ description: 'Whether the equipment uses diesel' })
  @IsBoolean()
  @IsOptional()
  diesel?: boolean;

  @ApiPropertyOptional({ description: 'Equipment status' })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiPropertyOptional({ description: 'Company ID' })
  @IsNumber()
  @IsOptional()
  companyId?: number;

  @ApiPropertyOptional({ description: 'Equipment category ID' })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Equipment type ID' })
  @IsNumber()
  @IsOptional()
  typeId?: number;

  @ApiPropertyOptional({ description: 'Equipment model ID' })
  @IsNumber()
  @IsOptional()
  modelId?: number;
}