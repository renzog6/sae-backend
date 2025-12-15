// filepath: sae-backend/src/modules/equipment/dto/equipment-query.dto.ts
import { BaseQueryDto } from "@common/dto";
import { IsEnum, IsOptional, IsInt, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { EquipmentStatus } from "@prisma/client";
import { Type } from "class-transformer";

/**
 * Extends BaseQueryDto to include equipment-specific filters.
 */
export class EquipmentQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by equipment status",
    enum: EquipmentStatus,
    example: "ACTIVE",
  })
  @IsOptional()
  @IsEnum(EquipmentStatus)
  status?: EquipmentStatus;

  @ApiPropertyOptional({ description: "Filter by type ID" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  typeId?: number;

  @ApiPropertyOptional({ description: "Filter by model ID" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  modelId?: number;

  @ApiPropertyOptional({ description: "Filter by category ID" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  categoryId?: number;

  @ApiPropertyOptional({ description: "Filter by year" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year?: number;
}
