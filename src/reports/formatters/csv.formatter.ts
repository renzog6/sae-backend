// filepath: sae-backend/src/reports/formatters/csv.formatter.ts

import { Injectable } from "@nestjs/common";
import { ReportFormatter } from "./report-formatter.interface";
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";
import { Parser } from "json2csv";

@Injectable()
export class CSVFormatter implements ReportFormatter {
  readonly format = "csv";

  async render(context: ReportContext): Promise<ReportResult> {
    const parser = new Parser({
      fields: context.columns.map((c) => ({ label: c.header, value: c.key })),
    });

    const csv = parser.parse(context.rows);

    return {
      buffer: Buffer.from(csv, "utf-8"),
      fileName: `${context.metadata?.fileName ?? "report"}.csv`,
      mimeType: "text/csv",
      metadata: context.metadata ?? {},
    };
  }
}
