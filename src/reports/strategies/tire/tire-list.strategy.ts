// filepath: sae-backend/src/reports/strategies/tire/tire-list.strategy.ts
import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ReportStrategy } from "@reports/strategies/report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { TireListMapper } from "@reports/mappers/tire/tire-list.mapper";
import { createReportContext } from "@reports/core/report-context";

/**
 * Strategy for generating tire list reports.
 * Creates a report context with tire information including ID, brand, model, size, and status.
 */
@Injectable()
export class TireListStrategy implements ReportStrategy {
  readonly type = ReportType.TIRE_LIST;
  private readonly logger = new Logger(TireListStrategy.name);

  constructor(private readonly mapper: TireListMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for tire list report`);

    // Validate filters
    const filters = dto.filter ?? {};
    if (
      filters.brandId &&
      (isNaN(Number(filters.brandId)) || Number(filters.brandId) <= 0)
    ) {
      throw new BadRequestException(
        "Invalid brandId: must be a positive number"
      );
    }
    if (
      filters.status &&
      !["active", "inactive", "mounted", "unmounted"].includes(filters.status)
    ) {
      throw new BadRequestException(
        'Invalid status: must be "active", "inactive", "mounted", or "unmounted"'
      );
    }

    const rows = await this.mapper.map(filters);

    if (rows.length === 0) {
      this.logger.warn(
        `No tire data found for filters: ${JSON.stringify(filters)}`
      );
    } else {
      this.logger.log(`Retrieved ${rows.length} tire records`);
    }

    return createReportContext({
      title: dto.title ?? "Tire List",
      columns: [
        { key: "id", header: "ID", width: 10 },
        { key: "brand", header: "Brand", width: 25 },
        { key: "model", header: "Model", width: 25 },
        { key: "size", header: "Size", width: 20 },
        { key: "serialNumber", header: "Serial Number", width: 25 },
        { key: "status", header: "Status", width: 15 },
        { key: "position", header: "Position", width: 20 },
        { key: "active", header: "Active", width: 10 },
      ],
      rows,
      format: dto.format,
      fileName: "tire_list",
      mimeType: "",
      metadata: {
        generatedAt: new Date().toISOString(),
        totalRecords: rows.length,
      },
    });
  }
}
