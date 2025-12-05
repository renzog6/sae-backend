// filepath: sae-backend/src/modules/tires/tire-assignments/dto/tire-assignments-query.dto.ts
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
 * Extends BaseQueryDto to include tire-assignments-specific filters.
 */
export class TireAssignmentsQueryDto extends BaseQueryDto {
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
    description: "Filter by assignment status (open or closed)",
    enum: ["open", "closed"],
    example: "open",
  })
  @IsOptional()
  @IsEnum(["open", "closed"])
  status?: "open" | "closed";

  @ApiPropertyOptional({
    description: "Filter by position configuration ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  positionConfigId?: number;

  @ApiPropertyOptional({
    description: "Filter by assignment date from",
    example: "2024-01-01T00:00:00Z",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @ApiPropertyOptional({
    description: "Filter by assignment date to",
    example: "2024-12-31T23:59:59Z",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate?: Date;
}
