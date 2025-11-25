// filepath: sae-backend/src/modules/history/controllers/history-log.controller.ts
import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { HistoryLogService } from "@modules/history/services/history-log.service";
import { EmployeeIncidentService } from "@modules/employees/services/employee-incident.service";
import { CreateEmployeeIncidentDto } from "@modules/employees/dto/create-employee-incident.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("history-logs")
@Controller("employees/:employeeId/history")
export class HistoryLogController {
  constructor(
    private employeeIncidentService: EmployeeIncidentService,
    private historyLogService: HistoryLogService
  ) {}

  @Post("incidents")
  async createIncident(
    @Param("employeeId") employeeId: string,
    @Body() createIncidentDto: CreateEmployeeIncidentDto
  ) {
    return this.employeeIncidentService.createIncident({
      ...createIncidentDto,
      employeeId: parseInt(employeeId),
    });
  }

  @Get()
  async getEmployeeHistory(@Param("employeeId") employeeId: string) {
    const [incidentsResponse, logs] = await Promise.all([
      this.employeeIncidentService.findByEmployee(parseInt(employeeId)),
      this.historyLogService.findByEntity("employee", parseInt(employeeId)),
    ]);

    return { incidents: incidentsResponse.data, logs };
  }
}
