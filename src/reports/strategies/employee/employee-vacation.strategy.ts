// filepath: sae-backend/src/reports/strategies/employee/employee-vacation.strategy.ts
import { Injectable } from "@nestjs/common";
import { ExcelService } from "@reports/services/excel.service";
import { ReportStrategy } from "@reports/strategies/report-strategy.interface";
import { ReportDataMapper } from "@reports/mappers/report-data.mapper";

/**
 * Strategy for generating employee vacation reports.
 * Creates an Excel spreadsheet with vacation information including employee name, dates, and duration.
 */
@Injectable()
export class EmployeeVacationStrategy implements ReportStrategy {
  fileName = "employee-vacations.xlsx";
  outputType = "excel" as const;
  mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(
    private readonly excelService: ExcelService,
    private readonly mapper: ReportDataMapper
  ) {}

  /**
   * Generates the employee vacation report.
   * @param filters Optional filters for the report (startDate, endDate)
   * @returns Buffer containing the Excel file
   */
  async generate(filters: Record<string, any>): Promise<Buffer> {
    const data = await this.mapper.mapEmployeeVacations(filters);

    const sheets = [
      {
        name: "Employee Vacations",
        columns: [
          { header: "Employee", key: "employee", width: 30 },
          { header: "Start Date", key: "startDate", width: 20 },
          { header: "End Date", key: "endDate", width: 20 },
          { header: "Days", key: "days", width: 10 },
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
