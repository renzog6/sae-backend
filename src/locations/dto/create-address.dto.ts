import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Street name',
    example: 'Av. Pellegrini',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  streetName: string;

  @ApiProperty({
    description: 'Street number',
    example: '1234',
    maxLength: 10,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  number?: string;

  @ApiProperty({
    description: 'Floor',
    example: '5',
    maxLength: 10,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  floor?: string;

  @ApiProperty({
    description: 'Apartment',
    example: 'A',
    maxLength: 10,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  apartment?: string;

  @ApiProperty({
    description: 'City ID',
    example: 69,
  })
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty({
    description: 'Company ID',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  companyId?: number;
}