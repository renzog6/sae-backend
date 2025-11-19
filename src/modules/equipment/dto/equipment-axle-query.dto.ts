//filepath: sae-backend/src/modules/equipment/dto/equipment-axle-query.dto.ts
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { IsOptional, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Extends BaseQueryDto to include equipment-specific filters for axles.
 */
export class EquipmentAxleQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by equipment ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  equipmentId?: number;
}
