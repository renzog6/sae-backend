// filepath: sae-backend/src/reports/strategies/equipment/equipment-list.strategy.ts
import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ReportStrategy } from "@reports/strategies/report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { EquipmentListMapper } from "@reports/mappers/equipment/equipment-list.mapper";
import { createReportContext } from "@reports/core/report-context";

/**
 * Strategy for generating equipment list reports.
 * Creates a report context with equipment information including ID, name, brand, model, and status.
 */
@Injectable()
export class EquipmentListStrategy implements ReportStrategy {
  readonly type = ReportType.EQUIPMENT_LIST;
  private readonly logger = new Logger(EquipmentListStrategy.name);

  constructor(private readonly mapper: EquipmentListMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for equipment list report`);

    // Validate filters
    const filters = dto.filter ?? {};
    if (
      filters.categoryId &&
      (isNaN(Number(filters.categoryId)) || Number(filters.categoryId) <= 0)
    ) {
      throw new BadRequestException(
        "Invalid categoryId: must be a positive number"
      );
    }
    if (
      filters.typeId &&
      (isNaN(Number(filters.typeId)) || Number(filters.typeId) <= 0)
    ) {
      throw new BadRequestException(
        "Invalid typeId: must be a positive number"
      );
    }
    if (
      filters.status &&
      !["active", "inactive", "maintenance"].includes(filters.status)
    ) {
      throw new BadRequestException(
        'Invalid status: must be "active", "inactive", or "maintenance"'
      );
    }

    const rows = await this.mapper.map(filters);

    if (rows.length === 0) {
      this.logger.warn(
        `No equipment data found for filters: ${JSON.stringify(filters)}`
      );
    } else {
      this.logger.log(`Retrieved ${rows.length} equipment records`);
    }

    return createReportContext({
      title: dto.title ?? "Equipment List",
      columns: [
        { key: "id", header: "ID", width: 10 },
        { key: "name", header: "Name", width: 25 },
        { key: "brand", header: "Brand", width: 20 },
        { key: "model", header: "Model", width: 20 },
        { key: "category", header: "Category" },
        { key: "status", header: "Status" },
        { key: "active", header: "Active", width: 10 },
        { key: "year", header: "Year" },
      ],
      rows,
      format: dto.format,
      fileName: "equipment_list",
      mimeType: "",
      metadata: {
        generatedAt: new Date().toISOString(),
        totalRecords: rows.length,
      },
    });
  }
}
