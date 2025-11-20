//filepath: sae-backend/src/reports/reports.module.ts

import { Module } from "@nestjs/common";
import { ReportsController } from "./controllers/reports.controller";

import { ReportsService } from "./services/reports.service";

import { ReportFactory, REPORT_STRATEGIES } from "./factories/report-factory";
import {
  ReportFormatFactory,
  REPORT_FORMATTERS,
} from "./factories/report-format-factory";

import { EmployeeListMapper } from "./mappers/employee/employee-list.mapper";
import { EmployeeVacationMapper } from "./mappers/employee/employee-vacation.mapper";
import { EquipmentListMapper } from "./mappers/equipment/equipment-list.mapper";
import { TireListMapper } from "./mappers/tire/tire-list.mapper";

// Strategies
import { EmployeeListStrategy } from "./strategies/employee/employee-list.strategy";
import { EmployeeVacationStrategy } from "./strategies/employee/employee-vacation.strategy";
import { EquipmentListStrategy } from "./strategies/equipment/equipment-list.strategy";
import { TireListStrategy } from "./strategies/tire/tire-list.strategy";

// Formatters
import { ExcelFormatter } from "./formatters/excel.formatter";
import { PdfFormatter } from "./formatters/pdf.formatter";
import { CsvFormatter } from "./formatters/csv.formatter";
import { DocxFormatter } from "./formatters/docx.formatter";

@Module({
  controllers: [ReportsController],
  providers: [
    ReportsService,

    // Mappers
    EmployeeListMapper,
    EmployeeVacationMapper,
    EquipmentListMapper,
    TireListMapper,

    // Strategies
    EmployeeListStrategy,
    EmployeeVacationStrategy,
    EquipmentListStrategy,
    TireListStrategy,

    // Provide strategies array for factory
    {
      provide: REPORT_STRATEGIES,
      useFactory: (
        employeeList: EmployeeListStrategy,
        employeeVacation: EmployeeVacationStrategy,
        equipmentList: EquipmentListStrategy,
        tireList: TireListStrategy
      ) => [employeeList, employeeVacation, equipmentList, tireList],
      inject: [
        EmployeeListStrategy,
        EmployeeVacationStrategy,
        EquipmentListStrategy,
        TireListStrategy,
      ],
    },

    // Provide formatters array for factory
    {
      provide: REPORT_FORMATTERS,
      useFactory: (
        excel: ExcelFormatter,
        pdf: PdfFormatter,
        csv: CsvFormatter,
        docx: DocxFormatter
      ) => [excel, pdf, csv, docx],
      inject: [ExcelFormatter, PdfFormatter, CsvFormatter, DocxFormatter],
    },

    // Factories
    ReportFactory,
    ReportFormatFactory,

    // Formatters
    ExcelFormatter,
    PdfFormatter,
    CsvFormatter,
    DocxFormatter,
  ],
})
export class ReportsModule {}
