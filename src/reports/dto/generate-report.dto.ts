//filepath: sae-backend/src/reports/dto/generate-report.dto.ts
import { IsEnum, IsOptional, IsObject, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ReportType } from "@reports/core/report-type.enum";

export enum ReportFormat {
  EXCEL = "excel",
  PDF = "pdf",
  CSV = "csv",
  DOCX = "docx",
}

export class GenerateReportDto {
  @IsEnum(ReportType)
  @ApiProperty({ enum: ReportType })
  reportType!: ReportType;

  @IsEnum(ReportFormat)
  @ApiProperty({ enum: ReportFormat })
  format!: ReportFormat;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    description: "Optional filters for the report (depends on report type)",
    example: { status: "active", categoryId: 1 },
  })
  filter?: Record<string, any>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "Custom title for the report",
    example: "Monthly Employee Report",
  })
  title?: string;
}
