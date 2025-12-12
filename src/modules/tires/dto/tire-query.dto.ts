// filepath: sae-backend/src/modules/tires/dto/tire-query.dto.ts
import { BaseQueryDto } from "@common/dto";
import { IsEnum, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { TireStatus } from "@prisma/client";

/**
 * Extends BaseQueryDto to include tire-specific filters.
 */
export class TireQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    enum: TireStatus,
    description: "Filter tires by status",
    required: false,
  })
  @IsOptional()
  @IsEnum(TireStatus)
  status?: TireStatus;
}
