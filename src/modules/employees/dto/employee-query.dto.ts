// filepath: sae-backend/src/modules/employees/dto/employee-query.dto.ts
import { BaseQueryDto } from "@common/dto";
import { IsEnum, IsOptional, IsInt, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { EmployeeStatus } from "@prisma/client";
import { Type } from "class-transformer";

/**
 * Extends BaseQueryDto to include employee-specific filters.
 */
export class EmployeeQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by employee status",
    enum: EmployeeStatus,
    example: "ACTIVE",
  })
  @IsOptional()
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;

  @ApiPropertyOptional({ description: "Filter by category ID" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  categoryId?: number;

  @ApiPropertyOptional({ description: "Filter by position ID" })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  positionId?: number;
}
