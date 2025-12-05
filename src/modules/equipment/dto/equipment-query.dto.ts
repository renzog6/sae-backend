//filepath: sae-backend/src/modules/equipment/dto/equipment-query.dto.ts
import { BaseQueryDto } from "@common/dto";
import { IsEnum, IsOptional } from "class-validator";
import { EquipmentStatus } from "@prisma/client";

/**
 * Extends BaseQueryDto to include equipment-specific filters.
 */
export class EquipmentQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsEnum(EquipmentStatus)
  status?: EquipmentStatus;
}
