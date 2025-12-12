// filepath: sae-backend/src/modules/employees/controllers/employee-incident.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { EmployeeIncidentService } from "../services/employee-incident.service";
import { CreateEmployeeIncidentDto } from "../dto/create-employee-incident.dto";
import { UpdateEmployeeIncidentDto } from "../../history/dto/update-employee-incident.dto";
import { EmployeeIncidentsQueryDto } from "../dto/employee-incidents-query.dto";

@ApiTags("employees-incidents")
@Controller("employee-incidents")
export class EmployeeIncidentController {
  constructor(
    private readonly employeeIncidentService: EmployeeIncidentService
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new employee incident",
    description:
      "Creates a new incident record for an employee with the provided details.",
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
  async create(@Body() createIncidentDto: CreateEmployeeIncidentDto) {
    return this.employeeIncidentService.createIncident(createIncidentDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all employee incidents with pagination",
    description:
      "Retrieves a paginated list of employee incidents based on query parameters.",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Page number (1-based)",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Items per page",
  })
  @ApiQuery({
    name: "q",
    required: false,
    type: String,
    description: "Search query for incident description",
  })
  @ApiQuery({
    name: "employeeId",
    required: false,
    type: Number,
    description: "Filter by employee ID",
  })
  @ApiQuery({
    name: "type",
    required: false,
    enum: ["SICK_LEAVE", "WORK_ACCIDENT", "DISCIPLINARY", "OTHER"],
    description: "Filter by incident type",
  })
  @ApiQuery({
    name: "paidLeave",
    required: false,
    type: Boolean,
    description: "Filter by paid leave status",
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    type: String,
    description: "Sort field",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    type: String,
    description: "Sort order (asc/desc)",
  })
  @ApiResponse({
    status: 200,
    description: "Employee incidents retrieved successfully",
  })
  async findAll(@Query() query: EmployeeIncidentsQueryDto) {
    return this.employeeIncidentService.findAll(query);
  }

  @Get("employee/:employeeId")
  @ApiOperation({
    summary: "Get incidents by employee",
    description:
      "Retrieves all incidents for a specific employee with pagination.",
  })
  @ApiParam({
    name: "employeeId",
    type: "number",
    description: "Unique identifier of the employee",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Page number (1-based)",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Items per page",
  })
  @ApiQuery({
    name: "type",
    required: false,
    enum: ["SICK_LEAVE", "WORK_ACCIDENT", "DISCIPLINARY", "OTHER"],
    description: "Filter by incident type",
  })
  @ApiResponse({
    status: 200,
    description: "Employee incidents retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Employee not found" })
  async findByEmployee(
    @Param("employeeId") employeeId: string,
    @Query() query: EmployeeIncidentsQueryDto
  ) {
    return this.employeeIncidentService.findByEmployee(
      parseInt(employeeId),
      query
    );
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update employee incident",
    description:
      "Updates an existing employee incident with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the incident to update",
  })
  @ApiBody({ type: UpdateEmployeeIncidentDto })
  @ApiResponse({
    status: 200,
    description: "Employee incident updated successfully",
  })
  @ApiResponse({ status: 404, description: "Employee incident not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  async update(
    @Param("id") id: string,
    @Body() updateIncidentDto: UpdateEmployeeIncidentDto
  ) {
    return this.employeeIncidentService.updateIncident(
      parseInt(id),
      updateIncidentDto
    );
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete employee incident",
    description: "Deletes an employee incident by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the incident to delete",
  })
  @ApiResponse({
    status: 200,
    description: "Employee incident deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Employee incident not found" })
  async delete(@Param("id") id: string) {
    return this.employeeIncidentService.deleteIncident(parseInt(id));
  }
}
