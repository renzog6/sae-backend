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
  @IsEnum(EmployeeIncidentType)
  type: EmployeeIncidentType;

  @IsString()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsBoolean()
  doctorNote?: boolean;

  @IsOptional()
  @IsBoolean()
  paidLeave?: boolean;

  @IsNumber()
  employeeId: number;
}
