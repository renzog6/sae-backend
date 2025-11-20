// filepath: sae-backend/src/reports/formatters/excel.formatter.ts
import { Injectable, Logger } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter";
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";

@Injectable()
export class ExcelFormatter implements ReportFormatter {
  readonly format = "excel";
  private readonly logger = new Logger(ExcelFormatter.name);

  async render(context: ReportContext): Promise<ReportResult> {
    this.logger.log(
      `Rendering Excel report: ${context.title} with ${context.rows.length} rows`
    );

    // Dynamic import to handle potential loading issues
    const ExcelJS = require("exceljs");

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(context.title);

    sheet.columns = context.columns.map((c) => ({
      header: c.header,
      key: c.key,
      width: typeof c.width === "number" ? c.width : 20,
    }));

    sheet.addRows(context.rows);

    // Apply styling to headers and data
    context.columns.forEach((column, colIndex) => {
      const columnLetter = String.fromCharCode(65 + colIndex); // A, B, C, etc.

      if (column.style?.header) {
        const headerCell = sheet.getCell(`${columnLetter}1`);
        if (column.style.header.bold) {
          headerCell.font = { ...headerCell.font, bold: true };
        }
        if (column.style.header.alignment) {
          headerCell.alignment = { horizontal: column.style.header.alignment };
        }
      }

      if (column.style?.data) {
        // Apply data styling to all rows in this column (starting from row 2)
        for (
          let rowIndex = 2;
          rowIndex <= context.rows.length + 1;
          rowIndex++
        ) {
          const dataCell = sheet.getCell(`${columnLetter}${rowIndex}`);
          if (column.style.data.alignment) {
            dataCell.alignment = { horizontal: column.style.data.alignment };
          }
        }
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return {
      buffer: Buffer.from(buffer),
      fileName: `${context.fileName}.xlsx`,
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      metadata: context.metadata,
    };
  }
}
