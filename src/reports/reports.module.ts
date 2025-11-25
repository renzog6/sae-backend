// filepath: sae-backend/src/reports/reports.module.ts

import { Module } from "@nestjs/common";
import { ReportsController } from "./controllers/reports.controller";
import { ReportsService } from "./services/reports.service";

import { MapperProviders } from "./mappers.providers";
import { StrategyProviders } from "./strategies.providers";
import { FormatterProviders } from "./formatters.providers";

import { ReportStrategyFactory } from "./strategies/report-strategy.factory";
import { ReportFormatterFactory } from "./formatters/report-formatter.factory";

@Module({
  controllers: [ReportsController],
  providers: [
    ReportsService,

    // Factories
    ReportStrategyFactory,
    ReportFormatterFactory,

    // Modular providers
    ...MapperProviders,
    ...StrategyProviders,
    ...FormatterProviders,
  ],
})
export class ReportsModule {}
