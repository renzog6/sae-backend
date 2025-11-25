// filepath: sae-backend/src/reports/strategies/employee/employee-list.strategy.ts

import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ReportStrategy } from "../report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { EmployeeListMapper } from "@reports/mappers/employee/employee-list.mapper";
import { createReportContext } from "@reports/core/report-context";
import { EMPLOYEE_COLUMN } from "@reports/columns/employee.columns";

@Injectable()
export class EmployeeListStrategy implements ReportStrategy {
  readonly type = ReportType.EMPLOYEE_LIST;
  private readonly logger = new Logger(EmployeeListStrategy.name);

  constructor(private readonly mapper: EmployeeListMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for employee list report`);

    const filters = dto.filter ?? {};

    // -------- VALIDACIONES --------
    if (
      filters.categoryId &&
      (isNaN(+filters.categoryId) || +filters.categoryId <= 0)
    ) {
      throw new BadRequestException("Invalid categoryId");
    }

    if (
      filters.positionId &&
      (isNaN(+filters.positionId) || +filters.positionId <= 0)
    ) {
      throw new BadRequestException("Invalid positionId");
    }

    if (
      filters.status &&
      !["active", "inactive", "suspended", "terminated"].includes(
        filters.status.toLowerCase()
      )
    ) {
      throw new BadRequestException("Invalid status");
    }

    // -------- OBTENER DATOS --------
    const rows = await this.mapper.map(filters);

    if (rows.length === 0) {
      this.logger.warn(`No employee data found`);
    } else {
      this.logger.log(`Retrieved ${rows.length} employee records`);
    }

    // -------- CONTEXTO NUEVO --------
    return createReportContext({
      title: dto.title ?? "Employee List",
      rows,

      columns: [
        EMPLOYEE_COLUMN.id,
        EMPLOYEE_COLUMN.employeeCode,
        EMPLOYEE_COLUMN.name,
        EMPLOYEE_COLUMN.dni,
        EMPLOYEE_COLUMN.birthDate,
        EMPLOYEE_COLUMN.age,
        EMPLOYEE_COLUMN.cuil,
        EMPLOYEE_COLUMN.hireDate,
        EMPLOYEE_COLUMN.seniority,
        EMPLOYEE_COLUMN.position,
        EMPLOYEE_COLUMN.category,
        EMPLOYEE_COLUMN.address,
        EMPLOYEE_COLUMN.phone,
        EMPLOYEE_COLUMN.email,
        EMPLOYEE_COLUMN.status,
      ],

      metadata: {
        fileName: "employee_list",
        generatedAt: new Date().toISOString(),
        totalRecords: rows.length,
      },
    });
  }
}
