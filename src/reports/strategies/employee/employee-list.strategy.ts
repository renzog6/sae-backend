// filepath: src/reports/strategies/employee/employee-list.strategy.ts
import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { ReportStrategy } from "../report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { EmployeeListMapper } from "@reports/mappers/employee/employee-list.mapper";
import { createReportContext } from "@reports/core/report-context";

@Injectable()
export class EmployeeListStrategy implements ReportStrategy {
  readonly type = ReportType.EMPLOYEE_LIST;
  private readonly logger = new Logger(EmployeeListStrategy.name);

  constructor(private readonly mapper: EmployeeListMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for employee list report`);

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
      filters.positionId &&
      (isNaN(Number(filters.positionId)) || Number(filters.positionId) <= 0)
    ) {
      throw new BadRequestException(
        "Invalid positionId: must be a positive number"
      );
    }
    if (
      filters.status &&
      !["active", "inactive", "suspended", "terminated"].includes(
        filters.status.toLowerCase()
      )
    ) {
      throw new BadRequestException(
        'Invalid status: must be "active", "inactive", "suspended", or "terminated"'
      );
    }

    const rows = await this.mapper.map(filters);

    if (rows.length === 0) {
      this.logger.warn(
        `No employee data found for filters: ${JSON.stringify(filters)}`
      );
    } else {
      this.logger.log(`Retrieved ${rows.length} employee records`);
    }

    return createReportContext({
      title: dto.title ?? "Employee List",
      columns: [
        //ID <--- Quita mas adelante.
        {
          key: "id",
          header: "ID",
          width: 10,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
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
        //DNI
        {
          key: "dni",
          header: "DNI",
          width: 10,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        // Fecha de Nacimiento
        {
          key: "birthDate",
          header: "F*Nacimiento",
          width: 15,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        //Edad
        {
          key: "age",
          header: "Edad",
          width: 10,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        //CUIL
        {
          key: "cuil",
          header: "CUIL",
          width: 15,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
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
        //Direccion
        {
          key: "address",
          header: "Direction",
          width: 60,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "left" },
          },
        },
        //Telefono
        {
          key: "phone",
          header: "Phone",
          width: 15,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
        //Email
        {
          key: "email",
          header: "Email",
          width: 25,
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "left" },
          },
        },
        //Estado
        {
          key: "active",
          header: "Active",
          style: {
            header: { bold: true, alignment: "center" },
            data: { alignment: "center" },
          },
        },
      ],
      rows,
      format: dto.format,
      fileName: "employee_list",
      mimeType: "",
      metadata: {
        generatedAt: new Date().toISOString(),
        totalRecords: rows.length,
      },
    });
  }
}
