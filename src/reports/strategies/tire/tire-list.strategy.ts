// filepath: sae-backend/src/reports/strategies/tire/tire-list.strategy.ts

import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ReportStrategy } from "@reports/strategies/report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { TireListMapper } from "@reports/mappers/tire/tire-list.mapper";
import { createReportContext } from "@reports/core/report-context";

@Injectable()
export class TireListStrategy implements ReportStrategy {
  readonly type = ReportType.TIRE_LIST;
  private readonly logger = new Logger(TireListStrategy.name);

  constructor(private readonly mapper: TireListMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for tire list report`);

    const filters = dto.filter ?? {};

    // -------- VALIDACIONES --------
    if (filters.brandId && (isNaN(+filters.brandId) || +filters.brandId <= 0)) {
      throw new BadRequestException(
        "Invalid brandId: must be a positive number"
      );
    }

    if (
      filters.status &&
      !["active", "inactive", "mounted", "unmounted"].includes(filters.status)
    ) {
      throw new BadRequestException(
        `Invalid status: must be "active", "inactive", "mounted", "unmounted"`
      );
    }

    // -------- OBTENER DATA --------
    const rows = await this.mapper.map(filters);

    if (rows.length === 0) {
      this.logger.warn(
        `No tire data found for filters: ${JSON.stringify(filters)}`
      );
    } else {
      this.logger.log(`Retrieved ${rows.length} tire records`);
    }

    // -------- CONTEXTO NUEVO --------
    return createReportContext({
      title: dto.title ?? "Tire List",
      rows,

      columns: [
        { key: "id", header: "ID", width: 10, type: "number" },

        { key: "brand", header: "Brand", width: 25, type: "string" },

        { key: "model", header: "Model", width: 25, type: "string" },

        { key: "size", header: "Size", width: 20, type: "string" },

        {
          key: "serialNumber",
          header: "Serial Number",
          width: 25,
          type: "string",
        },

        { key: "status", header: "Status", width: 15, type: "string" },

        { key: "position", header: "Position", width: 20, type: "string" },

        {
          key: "active",
          header: "Active",
          width: 10,
          type: "string",
        },
      ],

      metadata: {
        fileName: "tire_list",
        totalRecords: rows.length,
        filters,
        generatedAt: new Date().toISOString(),
      },
    });
  }
}
