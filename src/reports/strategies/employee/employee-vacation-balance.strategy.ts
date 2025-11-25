// filepath: sae-backend/src/reports/strategies/employee/employee-vacation.strategy.ts
import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ReportStrategy } from "../report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { EmployeeVacationBalanceMapper } from "@reports/mappers/employee/employee-vacation-balance.mapper";
import { createReportContext } from "@reports/core/report-context";
import { EMPLOYEE_COLUMN } from "@reports/columns/employee.columns";

@Injectable()
export class EmployeeVacationBalanceStrategy implements ReportStrategy {
  readonly type = ReportType.EMPLOYEE_VACATION_BALANCE;
  private readonly logger = new Logger(EmployeeVacationBalanceStrategy.name);

  constructor(private readonly mapper: EmployeeVacationBalanceMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for employee vacation report`);

    //---------------------------------------------
    // VALIDACIÓN DE FILTROS
    //---------------------------------------------
    const filters = dto.filter ?? {};

    if (filters.startDate && isNaN(Date.parse(filters.startDate))) {
      throw new BadRequestException("Invalid startDate");
    }
    if (filters.endDate && isNaN(Date.parse(filters.endDate))) {
      throw new BadRequestException("Invalid endDate");
    }
    if (
      filters.startDate &&
      filters.endDate &&
      new Date(filters.startDate) > new Date(filters.endDate)
    ) {
      throw new BadRequestException("startDate cannot be after endDate");
    }

    //---------------------------------------------
    // OBTENER FILAS DESDE MAPPER
    //---------------------------------------------
    const rows = await this.mapper.map(filters);

    if (rows.length === 0) {
      this.logger.warn(
        `No vacation data for filters: ${JSON.stringify(filters)}`
      );
    } else {
      this.logger.log(`Retrieved ${rows.length} vacation records`);
    }

    //---------------------------------------------
    // RETORNAR CONTEXTO ESTANDARIZADO
    //---------------------------------------------
    return createReportContext({
      title: dto.title ?? "Employee Vacation Report",

      columns: [
        EMPLOYEE_COLUMN.employeeCode,
        EMPLOYEE_COLUMN.name,
        EMPLOYEE_COLUMN.hireDate,
        EMPLOYEE_COLUMN.seniority,
        {
          key: "days",
          header: "Dias Disponibles",
          width: 12,
          type: "number",
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        EMPLOYEE_COLUMN.position,
        EMPLOYEE_COLUMN.category,
      ],

      rows,

      metadata: {
        fileName: "employee_vacation_balance",
        generatedAt: new Date().toISOString(),
        totalRecords: rows.length,
      },
    });
  }
}
