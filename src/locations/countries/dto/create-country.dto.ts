// file: sae-backend/src/locations/countries/dto/create-country.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'Argentina' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name!: string;

  @ApiProperty({ example: 'AR', description: 'ISO code' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 3)
  code!: string;
}
