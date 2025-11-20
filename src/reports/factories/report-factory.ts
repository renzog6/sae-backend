// filepath: src/reports/factories/report.factory.ts
import { Injectable, Logger, Inject } from "@nestjs/common";
import { ReportStrategy } from "../strategies/report-strategy.interface";
import { ReportType } from "../core/report-type.enum";

export const REPORT_STRATEGIES = Symbol("REPORT_STRATEGIES");

@Injectable()
export class ReportFactory {
  private readonly logger = new Logger(ReportFactory.name);
  private readonly strategies = new Map<string, ReportStrategy>();

  constructor(@Inject(REPORT_STRATEGIES) strategies: ReportStrategy[]) {
    for (const s of strategies) this.strategies.set(s.type, s);
    this.logger.log(`Registered ${strategies.length} report strategies`);
  }

  getStrategy(type: ReportType) {
    const s = this.strategies.get(type);
    if (!s) {
      this.logger.error(`Unknown report strategy requested: ${type}`);
      throw new Error(`Unknown report strategy: ${type}`);
    }
    this.logger.debug(`Retrieved strategy for type: ${type}`);
    return s;
  }
}
