// filepath: sae-backend/src/modules/persons/family/dto/create-family.dto.ts
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  IsOptional,
  ValidateIf,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateFamilyDto {
  @ApiProperty({
    example: "Padre",
    description:
      "Relationship type between the person and relative (e.g., Padre, Madre, Hijo, Esposo, etc.)",
    maxLength: 100,
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: "Relationship must not exceed 100 characters" })
  relationship!: string;

  @ApiProperty({
    example: 1,
    description: "ID of the main person in the relationship",
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt({ message: "Person ID must be an integer" })
  @Min(1, { message: "Person ID must be greater than 0" })
  @IsNotEmpty()
  personId!: number;

  @ApiProperty({
    example: 2,
    description: "ID of the relative person",
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt({ message: "Relative ID must be an integer" })
  @Min(1, { message: "Relative ID must be greater than 0" })
  @IsNotEmpty()
  relativeId!: number;

  @ApiPropertyOptional({
    description: "Additional information about the family relationship",
    example: "Relationship established through marriage",
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: "Information must be a string" })
  @MaxLength(500, { message: "Information must not exceed 500 characters" })
  information?: string;
}
