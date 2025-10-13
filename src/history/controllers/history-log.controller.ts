import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { HistoryLogService } from "../services/history-log.service";
import { EmployeeIncidentService } from "../services/employee-incident.service";
import { CreateEmployeeIncidentDto } from "../dto/create-employee-incident.dto";

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
    const [incidents, logs] = await Promise.all([
      this.employeeIncidentService.findByEmployee(parseInt(employeeId)),
      this.historyLogService.findByEntity("employee", parseInt(employeeId)),
    ]);

    return { incidents, logs };
  }
}
