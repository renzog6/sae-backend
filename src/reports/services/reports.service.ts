// filepath: src/reports/services/reports.service.ts
import { Injectable, Logger } from "@nestjs/common";
import { ReportFactory } from "@reports/factories/report-factory";
import { ReportFormatFactory } from "../factories/report-format-factory";
import { GenerateReportDto } from "../dto/generate-report.dto";
import { ReportResult } from "../core/report-result";

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private readonly reportFactory: ReportFactory,
    private readonly formatFactory: ReportFormatFactory
  ) {}

  async generate(dto: GenerateReportDto): Promise<ReportResult> {
    const startTime = Date.now();
    this.logger.log(
      `Starting report generation: type=${dto.reportType}, format=${dto.format}`
    );

    try {
      const strategy = this.reportFactory.getStrategy(dto.reportType);
      const context = await strategy.buildContext(dto);

      const formatter = this.formatFactory.getFormatter(dto.format);
      const result = await formatter.render(context);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Report generated successfully in ${duration}ms, size: ${result.buffer.length} bytes`
      );

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(
        `Report generation failed after ${duration}ms: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  async preview(dto: GenerateReportDto): Promise<any> {
    const context = await (
      await this.reportFactory.getStrategy(dto.reportType)
    ).buildContext(dto);

    return {
      title: context.title,
      columns: context.columns,
      preview: context.rows.slice(0, 20),
    };
  }
}
