/**
 * Reports module for SAE backend.
 * Provides report generation functionality with multiple strategies and formats.
 */
import { Module } from "@nestjs/common";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./services/reports.service";
import { ReportFactory } from "./factory/report.factory";

// Report strategies
import { EmployeeListStrategy } from "./strategies/employee/employee-list.strategy";
import { EmployeeVacationStrategy } from "./strategies/employee/employee-vacation.strategy";
import { EquipmentListStrategy } from "./strategies/equipment/equipment-list.strategy";
import { TireListStrategy } from "./strategies/tire/tire-list.strategy";

// Data mapping and services
import { ReportDataMapper } from "./mappers/report-data.mapper";
import { ExcelService } from "./services/excel.service";
import { PdfService } from "./services/pdf.service";

@Module({
  controllers: [ReportsController],
  providers: [
    // Main services
    ReportsService,
    ReportFactory,
    ReportDataMapper,

    // Report strategies
    EmployeeListStrategy,
    EmployeeVacationStrategy,
    EquipmentListStrategy,
    TireListStrategy,

    // Export services
    ExcelService,
    PdfService,
  ],
})
export class ReportsModule {}
