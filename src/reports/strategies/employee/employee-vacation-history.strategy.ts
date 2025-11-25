// filepath: sae-backend/src/reports/strategies/employee/employee-vacation-history.strategy.ts

import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ReportStrategy } from "../report-strategy.interface";
import { ReportType } from "@reports/core/report-type.enum";
import { GenerateReportDto } from "@reports/dto/generate-report.dto";
import { EmployeeVacationHistoryMapper } from "@reports/mappers/employee/employee-vacation-history.mapper";
import { createReportContext } from "@reports/core/report-context";

@Injectable()
export class EmployeeVacationHistoryStrategy implements ReportStrategy {
  readonly type = ReportType.EMPLOYEE_VACATION_HISTORY;
  private readonly logger = new Logger(EmployeeVacationHistoryStrategy.name);

  constructor(private readonly mapper: EmployeeVacationHistoryMapper) {}

  async buildContext(dto: GenerateReportDto) {
    this.logger.log(`Building context for vacation history report`);

    if (!dto.filter?.employeeId) {
      throw new BadRequestException("employeeId is required");
    }

    const { employeeName, availableDays, rows } = await this.mapper.map(
      Number(dto.filter.employeeId)
    );

    const sheetTitle = `${employeeName} - Dias disp ${availableDays}`;

    return createReportContext({
      title: sheetTitle, // nombre de la hoja
      rows,
      columns: [
        { key: "date", header: "Fecha", width: 15, type: "date" },
        { key: "type", header: "Tipo", width: 15, type: "string" },
        { key: "days", header: "Días", width: 10, type: "number" },
        { key: "year", header: "Año", width: 10, type: "number" },
        { key: "period", header: "Periodo", width: 30, type: "string" },
        { key: "detail", header: "Detalle", width: 30, type: "string" },
      ],
      metadata: {
        fileName: sheetTitle.replace(/ /g, "_"), // nombre del archivo
        employeeName,
        availableDays,
      },
    });
  }
}
