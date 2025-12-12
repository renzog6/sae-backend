//filepath: sae-backend/src/modules/catalogs/units/dto/create-unit.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUnitDto {
  @ApiProperty({
    description: "Name of the unit",
    example: "Kilogram",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Abbreviation for the unit",
    example: "kg",
  })
  @IsString()
  @IsNotEmpty()
  abbreviation!: string;

  @ApiPropertyOptional({
    description: "Whether the unit is active",
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: "Deletion date for soft delete",
    example: "2024-01-01T00:00:00.000Z",
  })
  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}
