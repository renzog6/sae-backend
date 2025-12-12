import { BaseQueryDto } from "@common/dto";
import { IsEnum, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { EmployeeStatus } from "@prisma/client";

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
}
