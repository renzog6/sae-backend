// filepath: sae-backend/src/modules/employees/controllers/employee-incident.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { EmployeeIncidentService } from "../services/employee-incident.service";
import { CreateEmployeeIncidentDto } from "../dto/create-employee-incident.dto";
import { UpdateEmployeeIncidentDto } from "../../history/dto/update-employee-incident.dto";
import { ApiTags } from "@nestjs/swagger";

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

  @Get("employee/:employeeId")
  async findByEmployee(@Param("employeeId") employeeId: string) {
    return this.employeeIncidentService.findByEmployee(parseInt(employeeId));
  }

  @Patch(":id")
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
