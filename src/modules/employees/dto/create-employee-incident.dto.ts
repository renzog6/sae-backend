// filepath: sae-backend/src/modules/employees/dto/create-employee-incident.dto.ts
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsNumber,
} from "class-validator";
import { EmployeeIncidentType } from "@prisma/client";

export class CreateEmployeeIncidentDto {
  @ApiProperty({
    enum: EmployeeIncidentType,
    description: "Type of the employee incident",
    example: "SICK_LEAVE",
  })
  @IsEnum(EmployeeIncidentType)
  type: EmployeeIncidentType;

  @ApiProperty({
    description: "Description of the incident",
    example: "Employee reported feeling unwell",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Start date of the incident in ISO format",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: "End date of the incident in ISO format",
    example: "2025-10-05T00:00:00.000Z",
  })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({
    description: "Creation date of the incident record in ISO format",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDateString()
  createdAt?: string;

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

  @ApiProperty({
    description: "ID of the employee associated with the incident",
    example: 1,
  })
  @IsNumber()
  employeeId: number;
}
