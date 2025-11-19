// filepath: sae-backend/src/reports/strategies/tire/tire-list.strategy.ts
import { Injectable } from "@nestjs/common";
import { ExcelService } from "@reports/services/excel.service";
import { ReportStrategy } from "@reports/strategies/report-strategy.interface";
import { ReportDataMapper } from "@reports/mappers/report-data.mapper";

/**
 * Strategy for generating tire list reports.
 * Creates an Excel spreadsheet with tire information including ID, brand, model, size, and status.
 */
@Injectable()
export class TireListStrategy implements ReportStrategy {
  fileName = "tire-list.xlsx";
  outputType = "excel" as const;
  mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(
    private readonly excelService: ExcelService,
    private readonly mapper: ReportDataMapper
  ) {}

  /**
   * Generates the tire list report.
   * @param filters Optional filters for the report (status, brandId)
   * @returns Buffer containing the Excel file
   */
  async generate(filters: Record<string, any>): Promise<Buffer> {
    const data = await this.mapper.mapTireList(filters);

    const sheets = [
      {
        name: "Tires",
        columns: [
          { header: "ID", key: "id", width: 10 },
          { header: "Brand", key: "brand", width: 25 },
          { header: "Model", key: "model", width: 25 },
          { header: "Size", key: "size", width: 20 },
          { header: "Serial Number", key: "serialNumber", width: 25 },
          { header: "Status", key: "status", width: 15 },
          { header: "Position", key: "position", width: 20 },
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
