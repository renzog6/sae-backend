// filepath: reports/strategies/employee/employee-vacation.strategy.ts
import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ReportStrategy } from "../report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { EmployeeVacationMapper } from "@reports/mappers/employee/employee-vacation.mapper";
import { createReportContext } from "@reports/core/report-context";

@Injectable()
export class EmployeeVacationStrategy implements ReportStrategy {
  readonly type = ReportType.EMPLOYEE_VACATION;
  private readonly logger = new Logger(EmployeeVacationStrategy.name);

  constructor(private readonly mapper: EmployeeVacationMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for employee vacation report`);

    // Validate filters
    const filters = dto.filter ?? {};
    if (filters.startDate && isNaN(Date.parse(filters.startDate))) {
      throw new BadRequestException(
        "Invalid startDate: must be a valid date string"
      );
    }
    if (filters.endDate && isNaN(Date.parse(filters.endDate))) {
      throw new BadRequestException(
        "Invalid endDate: must be a valid date string"
      );
    }
    if (
      filters.startDate &&
      filters.endDate &&
      new Date(filters.startDate) > new Date(filters.endDate)
    ) {
      throw new BadRequestException("startDate cannot be after endDate");
    }

    const rows = await this.mapper.map(filters);

    if (rows.length === 0) {
      this.logger.warn(
        `No vacation data found for filters: ${JSON.stringify(filters)}`
      );
    } else {
      this.logger.log(`Retrieved ${rows.length} vacation records`);
    }

    return createReportContext({
      title: dto.title ?? "Employee Vacation Report",
      columns: [
        //Legajo
        {
          key: "employeeCode",
          header: "Legajo",
          width: 10,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        //Apellido y Nombre
        {
          key: "name",
          header: "Name",
          width: 30,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "left" },
          },
        },
        //Fecha de Alta
        {
          key: "hireDate",
          header: "F*Alta",
          width: 15,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        //Antiguedad
        {
          key: "seniority",
          header: "Antiguedad",
          width: 12,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        //Antiguedad
        {
          key: "days",
          header: "Dias Disponibles",
          width: 12,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        //Puesto
        {
          key: "position",
          header: "Position",
          width: 15,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        //Categoria
        {
          key: "category",
          header: "Category",
          width: 15,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
      ],
      rows,
      format: dto.format,
      fileName: "employee_vacation",
      mimeType: "",
      metadata: {
        generatedAt: new Date().toISOString(),
        totalRecords: rows.length,
      },
    });
  }
}
