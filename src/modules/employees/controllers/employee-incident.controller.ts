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
import { EmployeeIncidentService } from "../services/employee-incident.service";
import { CreateEmployeeIncidentDto } from "../dto/create-employee-incident.dto";
import { UpdateEmployeeIncidentDto } from "../../history/dto/update-employee-incident.dto";
import { EmployeeIncidentsQueryDto } from "../dto/employee-incidents-query.dto";
import { ApiTags } from "@nestjs/swagger";
import { BaseResponseDto } from "@common/dto/base-query.dto";

@ApiTags("employees-incidents")
@Controller("employee-incidents")
export class EmployeeIncidentController {
  constructor(
    private readonly employeeIncidentService: EmployeeIncidentService
  ) {}

  @Post()
  async create(@Body() createIncidentDto: CreateEmployeeIncidentDto) {
    return this.employeeIncidentService.createIncident(createIncidentDto);
  }

  @Get()
  async findAll(@Query() query: EmployeeIncidentsQueryDto) {
    return this.employeeIncidentService.findAll(query);
  }

  @Get("employee/:employeeId")
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
  async delete(@Param("id") id: string) {
    return this.employeeIncidentService.deleteIncident(parseInt(id));
  }
}
