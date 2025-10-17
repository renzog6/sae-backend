//filepath: sae-backend/src/tires/tire-reports/tire-reports.module.ts
import { Module } from "@nestjs/common";
import { TireReportsService } from "./tire-reports.service";
import { TireReportsController } from "./tire-reports.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [TireReportsController],
  providers: [TireReportsService, PrismaService],
})
export class TireReportsModule {}
