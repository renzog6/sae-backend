// filepath: src/reports/factories/report-format-factory.ts
import { Injectable, Logger, Inject } from "@nestjs/common";
import { ReportFormatter } from "../formatters/report-formatter";
import { ReportFormat } from "../dto/generate-report.dto";

export const REPORT_FORMATTERS = Symbol("REPORT_FORMATTERS");

@Injectable()
export class ReportFormatFactory {
  private readonly logger = new Logger(ReportFormatFactory.name);
  private readonly formatters = new Map<string, ReportFormatter>();

  constructor(@Inject(REPORT_FORMATTERS) formatters: ReportFormatter[]) {
    for (const f of formatters) this.formatters.set(f.format, f);
    this.logger.log(`Registered ${formatters.length} formatters`);
  }

  getFormatter(format: ReportFormat): ReportFormatter {
    const f = this.formatters.get(format);
    if (!f) {
      this.logger.error(`Unknown formatter requested: ${format}`);
      throw new Error(`Unknown formatter: ${format}`);
    }
    this.logger.debug(`Retrieved formatter for format: ${format}`);
    return f;
  }
}
