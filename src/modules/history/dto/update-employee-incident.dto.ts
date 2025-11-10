// filepath: sae-backend/src/modules/history/dto/update-employee-incident.dto.ts
import {
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
} from "class-validator";
import { EmployeeIncidentType } from "@prisma/client";

export class UpdateEmployeeIncidentDto {
  @IsOptional()
  @IsEnum(EmployeeIncidentType)
  type?: EmployeeIncidentType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  doctorNote?: boolean;

  @IsOptional()
  @IsBoolean()
  paidLeave?: boolean;
}
