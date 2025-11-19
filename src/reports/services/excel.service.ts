// filepath: src/reports/services/excel.service.ts
import { Injectable, Logger } from "@nestjs/common";

export interface ExcelColumn {
  header: string;
  key: string;
  width?: number;
}

export interface ExcelRow {
  [key: string]: any;
}

/**
 * ExcelService produces Buffer outputs for workbook-like data.
 * Preferred: use exceljs (if available), otherwise fallback to CSV buffer.
 *
 * To enable full XLSX support:
 *   npm i -S exceljs
 */
@Injectable()
export class ExcelService {
  private readonly logger = new Logger(ExcelService.name);

  constructor() {}

  /**
   * Try to build a real XLSX buffer using exceljs if available,
   * otherwise produce a CSV buffer as fallback.
   *
   * @param sheets Array of sheets: { name, columns?, data[] }
   */
  async buildWorkbookBuffer(
    sheets: { name: string; columns?: ExcelColumn[]; data: ExcelRow[] }[]
  ): Promise<Buffer> {
    // Attempt exceljs path
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ExcelJS = require("exceljs") as typeof import("exceljs");

      const workbook = new ExcelJS.Workbook();
      for (const s of sheets) {
        const sheet = workbook.addWorksheet(s.name || "Sheet1");
        if (s.columns && s.columns.length > 0) {
          sheet.columns = s.columns.map((c) => ({
            header: c.header,
            key: c.key,
            width: c.width || 15,
          }));
        } else if (s.data && s.data.length > 0) {
          // Auto-detect columns from first row
          sheet.columns = Object.keys(s.data[0]).map((k) => ({
            header: this.formatColumnHeader(k),
            key: k,
            width: 15,
          }));
        }
        if (s.data && s.data.length > 0) {
          sheet.addRows(s.data);
        }
      }

      const buffer = await workbook.xlsx.writeBuffer();
      return Buffer.from(buffer);
    } catch (err: any) {
      this.logger.warn(
        "exceljs not available or failed, falling back to CSV. Install exceljs for real xlsx support.",
        err?.message ?? err
      );
      return this.generateCsvBufferFromSheets(sheets);
    }
  }

  /**
   * Fallback: create a plain-text CSV-like buffer for each sheet.
   */
  private generateCsvBufferFromSheets(
    sheets: { name: string; columns?: ExcelColumn[]; data: ExcelRow[] }[]
  ): Buffer {
    let output = "";
    for (const sheet of sheets) {
      output += `=== ${sheet.name} ===\n`;
      if (!sheet.data || sheet.data.length === 0) {
        output += "No data available\n\n";
        continue;
      }

      const columns =
        sheet.columns && sheet.columns.length > 0
          ? sheet.columns
          : this.autoDetectColumns(sheet.data[0]);
      output += columns.map((c) => c.header).join(",") + "\n";

      for (const row of sheet.data) {
        const line = columns
          .map((c) => {
            const val = row[c.key];
            if (val === null || val === undefined) return "";
            const s = String(val);
            if (s.includes(",") || s.includes('"')) {
              return `"${s.replace(/"/g, '""')}"`;
            }
            return s;
          })
          .join(",");
        output += line + "\n";
      }

      output += "\n";
    }

    return Buffer.from(output, "utf-8");
  }

  private autoDetectColumns(row: ExcelRow): ExcelColumn[] {
    return Object.keys(row || {}).map((k) => ({
      header: this.formatColumnHeader(k),
      key: k,
      width: 15,
    }));
  }

  private formatColumnHeader(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  }
}
