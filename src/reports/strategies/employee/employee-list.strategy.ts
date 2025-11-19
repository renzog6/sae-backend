// filepath: sae-backend/src/reports/strategies/employee/employee-list.strategy.ts
import { Injectable } from "@nestjs/common";
import { ExcelService } from "@reports/services/excel.service";
import { ReportStrategy } from "@reports/strategies/report-strategy.interface";
import { ReportDataMapper } from "@reports/mappers/report-data.mapper";

/**
 * Strategy for generating employee list reports.
 * Creates an Excel spreadsheet with employee information including ID, name, position, and status.
 */
@Injectable()
export class EmployeeListStrategy implements ReportStrategy {
  fileName = "employee-list.xlsx";
  outputType = "excel" as const;
  mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(
    private readonly excelService: ExcelService,
    private readonly mapper: ReportDataMapper
  ) {}

  /**
   * Generates the employee list report.
   * @param filters Optional filters for the report (status, categoryId, positionId)
   * @returns Buffer containing the Excel file
   */
  async generate(filters: Record<string, any>): Promise<Buffer> {
    const data = await this.mapper.mapEmployeeList(filters);

    const sheets = [
      {
        name: "Employees",
        columns: [
          { header: "ID", key: "id", width: 10 },
          { header: "Employee", key: "name", width: 30 },
          { header: "Position", key: "position", width: 25 },
          { header: "Active", key: "active", width: 10 },
        ],
        data: data,
      },
    ];

    return this.excelService.buildWorkbookBuffer(sheets);
  }

  /**
   * Maps data for the report (passthrough implementation).
   * @param data The data to map
   * @returns The mapped data
   */
  async map(data: any): Promise<any> {
    return data;
  }
}
