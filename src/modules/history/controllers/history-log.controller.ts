// filepath: sae-backend/src/modules/history/controllers/history-log.controller.ts
import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { HistoryLogService } from "@modules/history/services/history-log.service";
import { EmployeeIncidentService } from "@modules/employees/services/employee-incident.service";
import { CreateEmployeeIncidentDto } from "@modules/employees/dto/create-employee-incident.dto";

@ApiTags("history-logs")
@Controller("employees/:employeeId/history")
export class HistoryLogController {
  constructor(
    private employeeIncidentService: EmployeeIncidentService,
    private historyLogService: HistoryLogService
  ) {}

  @Post("incidents")
  @ApiOperation({
    summary: "Create employee incident",
    description: "Creates a new incident record for the specified employee.",
  })
  @ApiParam({
    name: "employeeId",
    type: "number",
    description: "Unique identifier of the employee",
  })
  @ApiBody({ type: CreateEmployeeIncidentDto })
  @ApiResponse({
    status: 201,
    description: "Employee incident created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Employee not found" })
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
  @ApiOperation({
    summary: "Get employee history",
    description:
      "Retrieves the complete history for a specific employee including incidents and logs.",
  })
  @ApiParam({
    name: "employeeId",
    type: "number",
    description: "Unique identifier of the employee",
  })
  @ApiResponse({
    status: 200,
    description: "Employee history retrieved successfully",
    schema: {
      type: "object",
      properties: {
        incidents: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              type: { type: "string" },
              description: { type: "string" },
              startDate: { type: "string", format: "date-time" },
              endDate: { type: "string", format: "date-time" },
            },
          },
        },
        logs: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              title: { type: "string" },
              description: { type: "string" },
              type: { type: "string" },
              severity: { type: "string" },
              eventDate: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: "Employee not found" })
  async getEmployeeHistory(@Param("employeeId") employeeId: string) {
    const [incidentsResponse, logs] = await Promise.all([
      this.employeeIncidentService.findByEmployee(parseInt(employeeId)),
      this.historyLogService.findByEntity("employee", parseInt(employeeId)),
    ]);

    return { incidents: incidentsResponse.data, logs };
  }
}
