import { BaseQueryDto } from "../../common/dto/base-query.dto";
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
