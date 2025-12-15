import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { EmployeeIncidentService } from "../services/employee-incident.service";
import { CreateEmployeeIncidentDto } from "../dto/create-employee-incident.dto";
import { UpdateEmployeeIncidentDto } from "../../history/dto/update-employee-incident.dto";
import { EmployeeIncidentsQueryDto } from "../dto/employee-incidents-query.dto";
import { EmployeeIncident } from "../entities/employee-incident.entity";
import { RolesGuard } from "@common/guards/roles.guard";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("employee-incidents")
@Controller("employee-incidents")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmployeeIncidentController extends BaseController<EmployeeIncident> {
  constructor(private readonly incidentService: EmployeeIncidentService) {
    super(incidentService, EmployeeIncident, "EmployeeIncident");
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Register a new incident" })
  @ApiBody({ type: CreateEmployeeIncidentDto })
  @ApiResponse({ status: 201, description: "Incident registered successfully" })
  override create(@Body() createIncidentDto: CreateEmployeeIncidentDto) {
    return this.incidentService.create(createIncidentDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Get all incidents with filtering" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "type", required: false, enum: ["SICK_LEAVE", "DISCIPLINARY", "WARNING", "ACCIDENT", "FAMILY_EMERGENCY", "UNJUSTIFIED_ABSENCE", "VACATION_LEAVE"], description: "Filter by incident type" })
  @ApiQuery({ name: "employeeId", required: false, type: Number, description: "Filter by employee ID" })
  override findAll(@Query() query: EmployeeIncidentsQueryDto) {
    return this.incidentService.findAll(query);
  }

  @Get("by-employee/:employeeId")
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @ApiOperation({ summary: "Get incidents by employee ID" })
  async findByEmployee(
    @Param("employeeId", ParseIntPipe) employeeId: number,
    @Query() query: EmployeeIncidentsQueryDto
  ) {
    return this.incidentService.findByEmployee(employeeId, query);
  }

  @Put(":id")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Update an incident" })
  @ApiResponse({ status: 200, description: "Incident updated successfully" })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateEmployeeIncidentDto
  ) {
    return this.incidentService.update(id, updateDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete an incident" })
  @ApiResponse({ status: 200, description: "Incident deleted successfully" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return this.incidentService.remove(id);
  }
}
