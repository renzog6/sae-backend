// filepath: sae-backend/src/modules/history/dto/create-history-log.dto.ts
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
  IsObject,
} from "class-validator";
import { HistoryType, SeverityLevel } from "@prisma/client";

export class CreateHistoryLogDto {
  @ApiProperty({
    description: "Title of the history log entry",
    example: "Employee Promotion",
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: "Detailed description of the history log entry",
    example: "Employee was promoted to senior position",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: HistoryType,
    description: "Type of history log entry",
    example: "EMPLOYEE_EVENT",
  })
  @IsEnum(HistoryType)
  type: HistoryType;

  @ApiPropertyOptional({
    enum: SeverityLevel,
    description: "Severity level of the log entry",
    example: "INFO",
  })
  @IsOptional()
  @IsEnum(SeverityLevel)
  severity?: SeverityLevel;

  @ApiPropertyOptional({
    description: "Date when the event occurred in ISO format",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDate()
  eventDate?: Date;

  @ApiPropertyOptional({
    description: "ID of the associated employee",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  employeeId?: number;

  @ApiPropertyOptional({
    description: "ID of the associated company",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  companyId?: number;

  @ApiPropertyOptional({
    description: "ID of the associated equipment",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  equipmentId?: number;

  @ApiPropertyOptional({
    description: "ID of the associated person",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiPropertyOptional({
    description: "Additional metadata as JSON string",
    example: '{"key": "value"}',
  })
  @IsOptional()
  @IsString()
  metadata?: string;
}
