// filepath: sae-backend/src/modules/employees/employee-positions/employee-positions.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
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
import { BaseQueryDto } from "@common/dto";
import { EmployeePositionsService } from "./employee-positions.service";
import { CreateEmployeePositionDto } from "./dto/create-employee-position.dto";
import { UpdateEmployeePositionDto } from "./dto/update-employee-position.dto";

@ApiTags("employee-positions")
@Controller("employee-positions")
export class EmployeePositionsController {
  constructor(
    private readonly employeePositionsService: EmployeePositionsService
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new employee position",
    description:
      "Creates a new employee position with the provided name, code, and details.",
  })
  @ApiBody({ type: CreateEmployeePositionDto })
  @ApiResponse({
    status: 201,
    description: "Employee position created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  create(@Body() createEmployeePositionDto: CreateEmployeePositionDto) {
    return this.employeePositionsService.create(createEmployeePositionDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all employee positions with pagination",
    description:
      "Retrieves a paginated list of employee positions based on query parameters.",
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
    description: "Search query for position name or code",
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
    description: "Employee positions retrieved successfully",
  })
  findAll(@Query() query: BaseQueryDto) {
    return this.employeePositionsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get employee position by ID",
    description:
      "Retrieves a specific employee position by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee position",
  })
  @ApiResponse({
    status: 200,
    description: "Employee position retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Employee position not found" })
  findOne(@Param("id") id: string) {
    return this.employeePositionsService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update employee position",
    description:
      "Updates an existing employee position with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee position to update",
  })
  @ApiBody({ type: UpdateEmployeePositionDto })
  @ApiResponse({
    status: 200,
    description: "Employee position updated successfully",
  })
  @ApiResponse({ status: 404, description: "Employee position not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(
    @Param("id") id: string,
    @Body() updateEmployeePositionDto: UpdateEmployeePositionDto
  ) {
    return this.employeePositionsService.update(+id, updateEmployeePositionDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete employee position",
    description: "Deletes an employee position by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee position to delete",
  })
  @ApiResponse({
    status: 200,
    description: "Employee position deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Employee position not found" })
  remove(@Param("id") id: string) {
    return this.employeePositionsService.remove(+id);
  }
}
