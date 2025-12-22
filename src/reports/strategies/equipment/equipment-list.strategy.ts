// filepath: sae-backend/src/reports/strategies/equipment/equipment-list.strategy.ts

import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ReportStrategy } from "../report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { EquipmentListMapper } from "@reports/mappers/equipment/equipment-list.mapper";
import { createReportContext } from "@reports/core/report-context";

@Injectable()
export class EquipmentListStrategy implements ReportStrategy {
  readonly type = ReportType.EQUIPMENT_LIST;
  private readonly logger = new Logger(EquipmentListStrategy.name);

  constructor(private readonly mapper: EquipmentListMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for equipment list report`);

    const filters = dto.filter ?? {};

    // -------- VALIDACIONES --------
    if (
      filters.categoryId &&
      (isNaN(+filters.categoryId) || +filters.categoryId <= 0)
    ) {
      throw new BadRequestException("Invalid categoryId");
    }

    if (filters.typeId && (isNaN(+filters.typeId) || +filters.typeId <= 0)) {
      throw new BadRequestException("Invalid typeId");
    }

    // -------- LOAD DATA --------
    const rows = await this.mapper.map(filters);

    if (rows.length === 0) {
      this.logger.warn(
        `No equipment found for filters: ${JSON.stringify(filters)}`
      );
    } else {
      this.logger.log(`Retrieved ${rows.length} equipment records`);
    }

    // -------- CONTEXTO NUEVO --------
    return createReportContext({
      title: dto.title ?? "Equipment List",
      rows,

      styles: {
        header: {
          bold: true,
          alignment: "center",
        },
      },

      columns: [
        {
          key: "id",
          header: "ID",
          width: 10,
          type: "number",
          style: {
            data: { alignment: "center" },
          },
        },
        {
          key: "category",
          header: "Category",
          type: "string",
        },
        {
          key: "name",
          header: "Name",
          width: 15,
          type: "string",
        },
        {
          key: "type",
          header: "Type",
          type: "string",
        },
        {
          key: "year",
          header: "Year",
          width: 10,
          type: "number",
          style: {
            data: { alignment: "center" },
          },
        },
        {
          key: "brand",
          header: "Brand",
          width: 20,
          type: "string",
        },
        {
          key: "model",
          header: "Model",
          width: 20,
          type: "string",
        },
        {
          key: "description",
          header: "Description",
          width: 30,
          type: "string",
        },
        { key: "chassis", header: "Chassis", width: 25, type: "string" },
        { key: "engine", header: "Engine", type: "string" },
        { key: "licensePlate", header: "License Plate", type: "string" },
        { key: "observation", header: "Observation", type: "string" },
        { key: "fuelType", header: "Fuel Type", type: "string" },
        {
          key: "status",
          header: "Status",
          type: "string",
        },
        {
          key: "active",
          header: "Active",
          width: 10,
          type: "string",
        },
      ],

      metadata: {
        fileName: "equipment_list",
        totalRecords: rows.length,
        filters,
        generatedAt: new Date().toISOString(),
      },
    });
  }
}
