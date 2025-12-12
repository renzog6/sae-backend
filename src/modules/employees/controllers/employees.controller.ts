// filepath: sae-backend/src/modules/employees/controllers/employees.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { EmployeesService } from "../services/employees.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { EmployeeQueryDto } from "../dto/employee-query.dto";

@ApiTags("employees")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({
    summary: "Get all employees with pagination",
    description:
      "Retrieves a paginated list of employees based on query parameters such as page, limit, search, and filters.",
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
    description: "Search query for employee code or person name",
  })
  @ApiQuery({
    name: "status",
    required: false,
    enum: ["ACTIVE", "INACTIVE"],
    description: "Filter by employee status",
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
  @ApiResponse({ status: 200, description: "Employees retrieved successfully" })
  findAll(@Query() query: EmployeeQueryDto) {
    return this.employeesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get employee by ID",
    description: "Retrieves a specific employee by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee",
  })
  @ApiResponse({ status: 200, description: "Employee retrieved successfully" })
  @ApiResponse({ status: 404, description: "Employee not found" })
  findOne(@Param("id") id: string) {
    return this.employeesService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: "Create a new employee",
    description:
      "Creates a new employee with the provided data including personal information, hire date, and position details.",
  })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: "Employee created successfully" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update employee information",
    description: "Updates an existing employee with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee to update",
  })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: 200, description: "Employee updated successfully" })
  @ApiResponse({ status: 404, description: "Employee not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(@Param("id") id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete employee",
    description: "Deletes an employee by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee to delete",
  })
  @ApiResponse({ status: 200, description: "Employee deleted successfully" })
  @ApiResponse({ status: 404, description: "Employee not found" })
  remove(@Param("id") id: string) {
    return this.employeesService.remove(+id);
  }
}
