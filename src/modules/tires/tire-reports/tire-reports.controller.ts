//filepath: sae-backend/src/tires/tire-reports/tire-reports.controller.ts
import { Controller, Get, Post, Body, Query, Res } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { TireReportsService } from "./tire-reports.service";
import { TireReportFilterDto } from "./dto/tire-report-filter.dto";
import { Response } from "express";
import { TireReportsExcelExporter } from "./exports/excel/tire-reports.exporter";
import { TireUsageReportService } from "./services/tire-usage-report.service";
import { TireUsageReportDto } from "./dto/tire-usage-report.dto";

@ApiTags("tire-reports")
@Controller("tires/reports")
export class TireReportsController {
  constructor(
    private readonly service: TireReportsService,
    private readonly usageReportService: TireUsageReportService
  ) {}
  
  @Post("usage")
  @ApiOperation({ summary: "Reporte de uso de neumáticos" })
  async generateUsageReport(@Body() dto: TireUsageReportDto) {
    return this.usageReportService.generateUsageReport(
      dto.startDate,
      dto.endDate,
      dto.equipmentId
    );
  }

  // --- JSON REPORTS ---

  @Get("average-life")
  @ApiOperation({ summary: "Promedio de vida útil (km)" })
  async getAverageLife(@Query() filter: TireReportFilterDto) {
    return this.service.getAverageLifeKm(filter);
  }

  @Get("cost-per-km")
  @ApiOperation({ summary: "Costo total por km recorrido" })
  async getCostPerKm(@Query() filter: TireReportFilterDto) {
    return this.service.getCostPerKm(filter);
  }

  @Get("over-recap")
  @ApiOperation({ summary: "Neumáticos recapados más de N veces" })
  async getOverRecapped(@Query("threshold") threshold = 2) {
    return this.service.getOverRecapped(Number(threshold));
  }

  @Get("brand-ranking")
  @ApiOperation({ summary: "Ranking de marcas por duración promedio" })
  async getBrandRanking() {
    return this.service.getBrandRanking();
  }

  @Get("yearly-recaps")
  @ApiOperation({ summary: "Reporte anual de recapados por marca" })
  async getYearlyRecap(@Query("year") year: number) {
    return this.service.getYearlyRecapReport(Number(year));
  }

  // --- EXCEL EXPORTS ---

  @Get("export/average-life")
  @ApiOperation({ summary: "Exportar vida útil promedio (Excel)" })
  async exportAverageLife(
    @Res() res: Response,
    @Query() filter: TireReportFilterDto
  ) {
    const data = await this.service.getAverageLifeKm(filter);
    await TireReportsExcelExporter.exportAverageLife(res, data);
  }

  @Get("export/brand-ranking")
  @ApiOperation({ summary: "Exportar ranking de marcas (Excel)" })
  async exportBrandRanking(@Res() res: Response) {
    const data = await this.service.getBrandRanking();
    await TireReportsExcelExporter.exportBrandRanking(res, data);
  }

  @Get("export/cost-per-km")
  @ApiOperation({ summary: "Exportar costo por KM (Excel)" })
  async exportCostPerKm(
    @Res() res: Response,
    @Query() filter: TireReportFilterDto
  ) {
    const data = await this.service.getCostPerKm(filter);
    await TireReportsExcelExporter.exportCostPerKm(res, data);
  }

  @Get("export/yearly-recaps")
  @ApiOperation({ summary: "Exportar recapados anuales (Excel)" })
  async exportYearlyRecaps(@Res() res: Response, @Query("year") year: number) {
    const data = await this.service.getYearlyRecapReport(Number(year));
    await TireReportsExcelExporter.exportYearlyRecaps(res, data);
  }
}
