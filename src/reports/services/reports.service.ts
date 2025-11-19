// filepath: sae-backend/src/reports/reports.service.ts

import { Injectable, BadRequestException } from "@nestjs/common";
import { ReportFactory } from "@reports/factory/report.factory";
import { ExcelService } from "@reports/services/excel.service";
import { PdfService } from "@reports/services/pdf.service";
import {
  GenerateReportDto,
  ReportFormat,
} from "@reports/dto/generate-report.dto";
import { ReportType } from "@common/enums/report-type.enum";

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportFactory: ReportFactory,
    private readonly excelService: ExcelService,
    private readonly pdfService: PdfService
  ) {}

  /**
   * Generates a report based on the provided DTO.
   */
  async generateReport(dto: GenerateReportDto): Promise<Buffer> {
    try {
      if (!this.validateReportRequest(dto)) {
        throw new BadRequestException("Invalid report request parameters");
      }

      const strategy = this.reportFactory.getStrategy(dto.reportType);

      const filters = dto.filter?.filters ?? dto.filter ?? {};

      const buffer = await strategy.generate(filters);

      if (dto.format === ReportFormat.PDF) {
        // Still placeholder until real PDF conversion is added
        return buffer;
      }

      return buffer;
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to generate report: ${error.message ?? error}`
      );
    }
  }

  /**
   * Generates a preview based on mock/sample data.
   */
  async generateReportPreview(dto: GenerateReportDto): Promise<any> {
    try {
      if (!this.validateReportRequest(dto)) {
        throw new BadRequestException("Invalid report request parameters");
      }

      const sampleData = this.generateSampleData(dto.reportType);

      return {
        preview: true,
        reportType: dto.reportType,
        format: dto.format,
        title: dto.title || this.generateDefaultTitle(dto.reportType),
        generatedAt: new Date().toISOString(),
        data: sampleData,
        summary: this.generateReportSummary(sampleData),
        filters: dto.filter,
      };
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to generate report preview: ${error.message ?? error}`
      );
    }
  }

  /**
   * Basic DTO validation
   */
  validateReportRequest(dto: GenerateReportDto): boolean {
    if (!dto) return false;

    if (!this.isValidReportType(dto.reportType)) return false;

    if (!Object.values(ReportFormat).includes(dto.format)) return false;

    return true;
  }

  /**
   * Exposes report types available in the factory.
   */
  getAvailableReportTypes(): ReportType[] {
    return this.reportFactory.getAvailableReportTypes();
  }

  private async generateExcelReport(
    dto: GenerateReportDto,
    data?: any
  ): Promise<Buffer> {
    const strategy = this.reportFactory.getStrategy(dto.reportType);
    const filters = dto.filter?.filters ?? dto.filter ?? {};
    return strategy.generate(filters);
  }

  private async generatePdfReport(
    dto: GenerateReportDto,
    data?: any
  ): Promise<Buffer> {
    const excelBuffer = await this.generateExcelReport(dto, data);
    return excelBuffer; // Placeholder
  }

  /**
   * Default titles
   */
  private generateDefaultTitle(reportType: ReportType): string {
    const titles: Record<ReportType, string> = {
      [ReportType.EMPLOYEE_LIST]: "Employee List Report",
      [ReportType.EMPLOYEE_VACATION]: "Employee Vacation Report",
      [ReportType.EQUIPMENT_LIST]: "Equipment List Report",
      [ReportType.TIRE_LIST]: "Tire List Report",
    };

    return titles[reportType] ?? "Report";
  }

  private generateReportSummary(data: any): any {
    if (!data) return {};

    return {
      totalRecords: Array.isArray(data) ? data.length : 1,
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Runtime validation for report type
   */
  private isValidReportType(reportType: string): reportType is ReportType {
    return Object.values(ReportType).includes(reportType as ReportType);
  }

  /**
   * Sample data for previews
   */
  private generateSampleData(reportType: ReportType): any[] {
    switch (reportType) {
      case ReportType.EMPLOYEE_LIST:
        return [
          { id: 1, name: "John Doe", position: "Manager", active: "Yes" },
          { id: 2, name: "Jane Smith", position: "Developer", active: "Yes" },
        ];

      case ReportType.EMPLOYEE_VACATION:
        return [
          {
            employee: "John Doe",
            startDate: "2024-01-01",
            endDate: "2024-01-15",
            days: 15,
          },
          {
            employee: "Jane Smith",
            startDate: "2024-02-01",
            endDate: "2024-02-10",
            days: 10,
          },
        ];

      case ReportType.EQUIPMENT_LIST:
        return [
          {
            id: 1,
            name: "Tractor JD 6145R",
            brand: "John Deere",
            model: "6145R",
            status: "ACTIVE",
          },
          {
            id: 2,
            name: "Combine S780",
            brand: "John Deere",
            model: "S780",
            status: "ACTIVE",
          },
        ];

      case ReportType.TIRE_LIST:
        return [
          {
            id: 1,
            brand: "Michelin",
            model: "Agribib",
            size: "380/90R46",
            status: "IN_STOCK",
          },
          {
            id: 2,
            brand: "Bridgestone",
            model: "VX-Tractor",
            size: "420/85R30",
            status: "IN_USE",
          },
        ];

      default:
        return [];
    }
  }
}
