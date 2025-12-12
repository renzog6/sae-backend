// filepath: sae-backend/src/modules/persons/dto/update-family.dto.ts
import { PartialType, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateFamilyDto } from "./create-family.dto";
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  MaxLength,
  ValidateIf,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateFamilyDto extends PartialType(CreateFamilyDto) {
  @ApiPropertyOptional({
    description: "Relationship type between the person and relative",
    example: "Madre",
    maxLength: 100,
    minLength: 1,
  })
  @IsOptional()
  @IsString({ message: "Relationship must be a string" })
  @MaxLength(100, { message: "Relationship must not exceed 100 characters" })
  @ValidateIf((o) => o.relationship !== undefined)
  relationship?: string;

  @ApiPropertyOptional({
    description: "ID of the main person in the relationship",
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Person ID must be an integer" })
  @Min(1, { message: "Person ID must be greater than 0" })
  @ValidateIf((o) => o.personId !== undefined)
  personId?: number;

  @ApiPropertyOptional({
    description: "ID of the relative person",
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Relative ID must be an integer" })
  @Min(1, { message: "Relative ID must be greater than 0" })
  @ValidateIf((o) => o.relativeId !== undefined)
  relativeId?: number;
}
