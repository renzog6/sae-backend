// filepath: src/reports/formatters/csv.formatter.ts
import { Injectable } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter";
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";
import { Parser } from "json2csv";

@Injectable()
export class CsvFormatter implements ReportFormatter {
  readonly format = "csv";

  async render(context: ReportContext): Promise<ReportResult> {
    const fields = context.columns.map((c) => ({
      label: c.header,
      value: c.key,
    }));
    const csv = new Parser({ fields }).parse(context.rows);

    return {
      buffer: Buffer.from(csv),
      fileName: `${context.fileName}.csv`,
      mimeType: "text/csv",
      metadata: context.metadata,
    };
  }
}
