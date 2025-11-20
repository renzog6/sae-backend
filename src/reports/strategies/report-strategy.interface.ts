// filepath: src/reports/strategies/report-strategy.interface.ts
import { GenerateReportDto } from "../dto/generate-report.dto";
import { ReportContext } from "../core/report-context";

export interface ReportStrategy {
  readonly type: string;
  buildContext(dto: GenerateReportDto): Promise<ReportContext>;
}
