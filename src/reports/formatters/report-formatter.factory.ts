// filepath: sae-backend/src/reports/formatters/report-formatter.factory.ts
import { Injectable } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter.interface";

import { XLSXFormatter } from "./xlsx.formatter";
import { CSVFormatter } from "./csv.formatter";
import { PDFFormatter } from "./pdf.formatter";
import { DOCXFormatter } from "./docx.formatter";

@Injectable()
export class ReportFormatterFactory {
  private readonly formatters = new Map<string, ReportFormatter>();

  constructor(
    private readonly xlsx: XLSXFormatter,
    private readonly csv: CSVFormatter,
    private readonly pdf: PDFFormatter,
    private readonly docx: DOCXFormatter
  ) {
    this.formatters.set("xlsx", this.xlsx);
    this.formatters.set("csv", this.csv);
    this.formatters.set("pdf", this.pdf);
    this.formatters.set("docx", this.docx);
  }

  getFormatter(format: string): ReportFormatter {
    const f = this.formatters.get(format.toLowerCase());
    if (!f) {
      throw new Error(`No formatter registered for format: ${format}`);
    }
    return f;
  }
}
