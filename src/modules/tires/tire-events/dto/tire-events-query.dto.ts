// filepath: sae-backend/src/modules/tires/tire-events/dto/tire-events-query.dto.ts
import { BaseQueryDto } from "@common/dto";
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
 * Extends BaseQueryDto to include tire-events-specific filters.
 */
export class TireEventsQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by tire ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  tireId?: number;

  @ApiPropertyOptional({
    description: "Filter by event type",
    example: "ASSIGNMENT",
  })
  @IsOptional()
  @IsString()
  eventType?: string;

  @ApiPropertyOptional({
    description: "Filter by event date from",
    example: "2024-01-01T00:00:00Z",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @ApiPropertyOptional({
    description: "Filter by event date to",
    example: "2024-12-31T23:59:59Z",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate?: Date;

  @ApiPropertyOptional({
    description: "Filter by equipment ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  equipmentId?: number;
}
