// filepath: sae-backend/src/modules/employees/dto/employee-incidents-query.dto.ts
import { BaseQueryDto } from "@common/dto";
import { IsOptional, IsNumber, IsEnum, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { EmployeeIncidentType } from "@prisma/client";

/**
 * Extends BaseQueryDto to include employee-specific filters for incidents.
 */
export class EmployeeIncidentsQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by employee ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  employeeId?: number;

  @ApiPropertyOptional({
    description: "Filter by incident type",
    enum: EmployeeIncidentType,
    example: "SICK_LEAVE",
  })
  @IsOptional()
  @IsEnum(EmployeeIncidentType)
  type?: EmployeeIncidentType;

  @ApiPropertyOptional({
    description: "Filter by whether it's a paid leave",
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  paidLeave?: boolean;
}
