import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    description: 'City name',
    example: 'Rosario',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Postal code',
    example: '2000',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  postalCode: string;

  @ApiProperty({
    description: 'Province ID',
    example: 20,
  })
  @IsNumber()
  @IsNotEmpty()
  provinceId: number;
}