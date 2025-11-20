// filepath: src/reports/formatters/formatter.interface.ts
import { ReportContext } from "../core/report-context";
import { ReportResult } from "../core/report-result";

export interface ReportFormatter {
  readonly format: string;
  render(context: ReportContext): Promise<ReportResult>;
}
