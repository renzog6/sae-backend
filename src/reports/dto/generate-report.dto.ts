//filepath: sae-backend/src/reports/dto/generate-report.dto.ts
import { IsEnum, IsOptional, IsObject, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ReportType } from "@reports/core/report-type.enum";

export enum ReportFormat {
  XLSX = "xlsx",
  PDF = "pdf",
  CSV = "csv",
  DOCX = "docx",
}

export class GenerateReportDto {
  @IsEnum(ReportType)
  @ApiProperty({
    enum: ReportType,
    description: "Type of report to generate",
    examples: {
      employee_list: {
        value: "employee_list",
        description: "Employee List - Basic employee information report",
      },
      employee_vacation_balance: {
        value: "employee_vacation_balance",
        description:
          "Employee Vacation Balance - Remaining vacation days report",
      },
      employee_vacation_history: {
        value: "employee_vacation_history",
        description: "Employee Vacation History - Past vacation records report",
      },
      equipment_list: {
        value: "equipment_list",
        description: "Equipment List - Equipment inventory report",
      },
      tire_list: {
        value: "tire_list",
        description: "Tire List - Tire inventory and condition report",
      },
    },
  })
  reportType!: ReportType;

  @IsEnum(ReportFormat)
  @ApiProperty({
    enum: ReportFormat,
    description: "Output format for the report",
    examples: {
      xlsx: { value: "xlsx", description: "Excel spreadsheet format" },
      pdf: { value: "pdf", description: "PDF document format" },
      csv: { value: "csv", description: "Comma-separated values format" },
      docx: { value: "docx", description: "Microsoft Word document format" },
    },
  })
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
