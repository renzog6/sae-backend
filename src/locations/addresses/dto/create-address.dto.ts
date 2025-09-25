// file: sae-backend/src/locations/addresses/dto/create-address.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  MaxLength, 
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAddressDto {
  @ApiProperty({ description: 'Street name', example: 'Av. Pellegrini', maxLength: 150, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  street?: string;

  @ApiProperty({ description: 'Street number', example: '1234', maxLength: 10, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  number?: string;

  @ApiProperty({ description: 'Floor', example: '5', maxLength: 10, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  floor?: string;

  @ApiProperty({ description: 'Apartment', example: 'A', maxLength: 10, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  apartment?: string;

  @ApiProperty({ description: 'Postal code', example: '2000', maxLength: 20, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  postalCode?: string;

  @ApiProperty({ description: 'Neighborhood', example: 'Centro', maxLength: 100, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  neighborhood?: string;

  @ApiProperty({ description: 'Reference for location', example: 'Frente al parque', maxLength: 255, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  reference?: string;

  @ApiProperty({ description: 'Latitude coordinate', example: -32.9442426, required: false })
  @IsOptional()
  @Type(() => Number)
  latitude?: number;

  @ApiProperty({ description: 'Longitude coordinate', example: -60.6505388, required: false })
  @IsOptional()
  @Type(() => Number)
  longitude?: number;

  @ApiProperty({ description: 'Is address active', example: true, default: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ description: 'City ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  cityId!: number;

  @ApiProperty({ description: 'Person ID (optional)', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  personId?: number;

  @ApiProperty({ description: 'Company ID (optional)', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  companyId?: number;
}
