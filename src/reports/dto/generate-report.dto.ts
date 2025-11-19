// filepath: src/reports/dto/generate-report.dto.ts
import { IsEnum, IsOptional, IsString, IsObject } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ReportType } from "@common/enums/report-type.enum";

/**
 * Supported output formats
 */
export enum ReportFormat {
  EXCEL = "excel",
  PDF = "pdf",
}

export { ReportType };

/**
 * DTO for report generation
 */
export class GenerateReportDto {
  @ApiProperty({
    description: "Report type identifier",
    enum: ReportType,
    example: ReportType.EMPLOYEE_LIST,
  })
  @IsEnum(ReportType)
  reportType!: ReportType;

  @ApiPropertyOptional({
    description:
      "Filter object to restrict report data. E.g. { filters: { dateFrom: '2024-01-01' } } or plain filters object",
    type: Object,
  })
  @IsOptional()
  @IsObject()
  filter?: Record<string, any>;

  @ApiProperty({
    description: "Desired output format",
    enum: ReportFormat,
    example: ReportFormat.EXCEL,
  })
  @IsEnum(ReportFormat)
  format!: ReportFormat;

  @ApiPropertyOptional({
    description: "Optional report title",
    example: "My Report",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: "Company id to filter by", example: 1 })
  @IsOptional()
  companyId?: number;

  @ApiPropertyOptional({ description: "Employee id to filter by", example: 2 })
  @IsOptional()
  employeeId?: number;

  @ApiPropertyOptional({
    description: "Date from (ISO)",
    example: "2024-01-01",
  })
  @IsOptional()
  dateFrom?: string;

  @ApiPropertyOptional({ description: "Date to (ISO)", example: "2024-01-31" })
  @IsOptional()
  dateTo?: string;
}
