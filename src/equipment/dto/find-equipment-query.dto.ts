// filepath: sae-backend/src/equipment/dto/find-equipment-query.dto.ts

import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min, MaxLength } from "class-validator";

export class FindEquipmentQueryDto {
  @ApiPropertyOptional({
    description: "Filter by equipment type ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  typeId?: number;

  @ApiPropertyOptional({
    description: "Filter by equipment model ID",
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  modelId?: number;

  @ApiPropertyOptional({
    description: "Filter by equipment category ID",
    example: 4,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({
    description: "Filter by equipment manufacturing year",
    example: 2024,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional({
    description:
      "Search term to filter by license plate, internal code, or description",
    example: "Hilux",
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  search?: string;

  @ApiPropertyOptional({
    description: "Number of records to skip (for pagination)",
    example: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number = 0;

  @ApiPropertyOptional({
    description: "Number of records to take (for pagination)",
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  take?: number = 25;
}
