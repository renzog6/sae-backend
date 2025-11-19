// filepath: sae-backend/src/reports/strategies/equipment/equipment-list.strategy.ts
import { Injectable } from "@nestjs/common";
import { ExcelService } from "@reports/services/excel.service";
import { ReportStrategy } from "@reports/strategies/report-strategy.interface";
import { ReportDataMapper } from "@reports/mappers/report-data.mapper";

/**
 * Strategy for generating equipment list reports.
 * Creates an Excel spreadsheet with equipment information including ID, name, brand, model, and status.
 */
@Injectable()
export class EquipmentListStrategy implements ReportStrategy {
  fileName = "equipment-list.xlsx";
  outputType = "excel" as const;
  mimeType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  constructor(
    private readonly excelService: ExcelService,
    private readonly mapper: ReportDataMapper
  ) {}

  /**
   * Generates the equipment list report.
   * @param filters Optional filters for the report (status, categoryId, typeId)
   * @returns Buffer containing the Excel file
   */
  async generate(filters: Record<string, any>): Promise<Buffer> {
    const data = await this.mapper.mapEquipmentList(filters);

    const sheets = [
      {
        name: "Equipment",
        columns: [
          { header: "ID", key: "id", width: 10 },
          { header: "Name", key: "name", width: 25 },
          { header: "Brand", key: "brand", width: 20 },
          { header: "Model", key: "model", width: 20 },
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
