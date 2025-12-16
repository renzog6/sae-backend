import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  Delete,
} from "@nestjs/common";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from "@nestjs/swagger";

import { EmployeesService } from "../services/employees.service";
import { Employee } from "../entities/employee.entity";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { EmployeeQueryDto } from "../dto/employee-query.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";

@ApiTags("employees")
@Controller("employees")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmployeesController extends BaseController<Employee> {
  constructor(private readonly employeesService: EmployeesService) {
    super(employeesService, Employee, "Employee");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Create a new employee" })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: "Employee created successfully" })
  override create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @ApiOperation({ summary: "Get all employees" })
  @ApiResponse({ status: 200, description: "List of employees retrieved successfully" })
  override findAll(@Query() query: EmployeeQueryDto) {
    return this.employeesService.findAll(query);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Update an employee" })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: 200, description: "Employee updated successfully" })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(id, dto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete employee" })
  @ApiParam({ name: "id", type: "number" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return super.remove(id);
  }
}

