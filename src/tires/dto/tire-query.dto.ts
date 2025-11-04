import { BaseQueryDto } from "../../common/dto/base-query.dto";
import { IsEnum, IsOptional } from "class-validator";
import { TireStatus } from "@prisma/client";

/**
 * Extends BaseQueryDto to include tire-specific filters.
 */
export class TireQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsEnum(TireStatus)
  status?: TireStatus;
}
