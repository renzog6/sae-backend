import { Injectable, Logger } from "@nestjs/common";
import { GenerateReportDto } from "../dto/generate-report.dto";
import { ReportResult } from "../core/report-result";
import { ReportStrategyFactory } from "../strategies/report-strategy.factory";
import { ReportFormatterFactory } from "../formatters/report-formatter.factory";

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private readonly strategyFactory: ReportStrategyFactory,
    private readonly formatterFactory: ReportFormatterFactory
  ) {}

  /**
   * Genera el reporte final (PDF/XLSX/CSV/DOCX).
   */
  async generate(dto: GenerateReportDto): Promise<ReportResult> {
    const start = Date.now();
    this.logger.log(
      `Generating report: type=${dto.reportType}, format=${dto.format}`
    );

    try {
      // 1) Obtener strategy del tipo de reporte
      const strategy = this.strategyFactory.getStrategy(dto.reportType);

      // 2) Obtener contexto de dominio (ReportContext)
      const context = await strategy.buildContext(dto);

      // 3) Obtener formatter según formato solicitado
      const formatter = this.formatterFactory.getFormatter(dto.format);

      // 4) Generar archivo final
      const result = await formatter.render(context);

      const ms = Date.now() - start;
      this.logger.log(
        `Report generated successfully in ${ms}ms (size=${result.buffer.length} bytes)`
      );

      return result;
    } catch (err: any) {
      const ms = Date.now() - start;
      this.logger.error(
        `Report generation failed after ${ms}ms: ${err.message}`,
        err.stack
      );
      throw err;
    }
  }
}
