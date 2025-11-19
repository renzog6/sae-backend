// filepath: sae-backend/src/modules/tires/tire-inspections/dto/tire-inspections-query.dto.ts
import { BaseQueryDto } from "@common/dto/base-query.dto";
import {
  IsOptional,
  IsNumber,
  IsEnum,
  IsString,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Extends BaseQueryDto to include tire-inspections-specific filters.
 */
export class TireInspectionsQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by tire ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tireId?: number;

  @ApiPropertyOptional({
    description: "Filter by equipment ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  equipmentId?: number;

  @ApiPropertyOptional({
    description: "Filter by inspection date from",
    example: "2024-01-01T00:00:00Z",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @ApiPropertyOptional({
    description: "Filter by inspection date to",
    example: "2024-12-31T23:59:59Z",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate?: Date;

  @ApiPropertyOptional({
    description: "Filter by minimum pressure",
    example: 28.5,
  })
  @IsOptional()
  @Type(() => Number)
  minPressure?: number;

  @ApiPropertyOptional({
    description: "Filter by minimum tread depth",
    example: 4.0,
  })
  @IsOptional()
  @Type(() => Number)
  minTreadDepth?: number;
}
