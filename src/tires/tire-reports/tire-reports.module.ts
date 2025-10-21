//filepath: sae-backend/src/tires/tire-reports/tire-reports.module.ts
import { Module } from "@nestjs/common";
import { TireReportsService } from "./tire-reports.service";
import { TireReportsController } from "./tire-reports.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { TireUsageReportService } from "./services/tire-usage-report.service";

@Module({
  controllers: [TireReportsController],
  providers: [TireReportsService, TireUsageReportService, PrismaService],
  exports: [TireReportsService, TireUsageReportService],
})
export class TireReportsModule {}
