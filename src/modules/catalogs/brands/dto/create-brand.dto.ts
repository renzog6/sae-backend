//filepath: sae-backend/src/modules/catalogs/brands/dto/create-brand.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBrandDto {
  @ApiProperty({
    description: "Name of the brand",
    example: "Michelin",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Unique code for the brand",
    example: "MICH",
  })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiPropertyOptional({
    description: "Additional information about the brand",
  })
  @IsString()
  @IsOptional()
  information?: string;

  @ApiPropertyOptional({
    description: "Whether the brand is active",
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
