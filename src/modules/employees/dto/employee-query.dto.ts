import { BaseQueryDto } from "@common/dto/base-query.dto";
import { IsEnum, IsOptional } from "class-validator";
import { EmployeeStatus } from "@prisma/client";

/**
 * Extends BaseQueryDto to include employee-specific filters.
 */
export class EmployeeQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsEnum(EmployeeStatus)
  status?: EmployeeStatus;
}
