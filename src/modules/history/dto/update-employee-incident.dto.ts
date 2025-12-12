// filepath: sae-backend/src/modules/history/dto/update-employee-incident.dto.ts
import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
} from "class-validator";
import { EmployeeIncidentType } from "@prisma/client";

export class UpdateEmployeeIncidentDto {
  @ApiPropertyOptional({
    enum: EmployeeIncidentType,
    description: "Type of the employee incident",
    example: "SICK_LEAVE",
  })
  @IsOptional()
  @IsEnum(EmployeeIncidentType)
  type?: EmployeeIncidentType;

  @ApiPropertyOptional({
    description: "Description of the incident",
    example: "Updated incident description",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Start date of the incident in ISO format",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: "End date of the incident in ISO format",
    example: "2025-10-05T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: "Whether the incident requires a doctor's note",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  doctorNote?: boolean;

  @ApiPropertyOptional({
    description: "Whether the incident qualifies as paid leave",
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  paidLeave?: boolean;
}
