import {
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class TireInspectionsQueryDto {
  @ApiPropertyOptional({
    description: "Page number (1-based)",
    example: 1,
  })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Items per page",
    example: 10,
  })
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ description: "Search query", example: "search term" })
  @IsOptional()
  @IsString()
  q?: string;

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

  get skip(): number {
    return ((this.page || 1) - 1) * (this.limit || 10);
  }

  get take(): number {
    return this.limit || 10;
  }
}
