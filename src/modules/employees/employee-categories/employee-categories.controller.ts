// filepath: sae-backend/src/modules/employees/employee-categories/employee-categories.controller.ts
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
  ApiParam,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto";
import { EmployeeCategoriesService } from "./employee-categories.service";
import { CreateEmployeeCategoryDto } from "./dto/create-employee-category.dto";
import { UpdateEmployeeCategoryDto } from "./dto/update-employee-category.dto";

@ApiTags("employee-categories")
@Controller("employee-categories")
export class EmployeeCategoriesController {
  constructor(
    private readonly employeeCategoriesService: EmployeeCategoriesService
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new employee category",
    description:
      "Creates a new employee category with the provided name, code, and details.",
  })
  @ApiBody({ type: CreateEmployeeCategoryDto })
  @ApiResponse({
    status: 201,
    description: "Employee category created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  create(@Body() createEmployeeCategoryDto: CreateEmployeeCategoryDto) {
    return this.employeeCategoriesService.create(createEmployeeCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all employee categories with pagination",
    description:
      "Retrieves a paginated list of employee categories based on query parameters.",
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
    description: "Search query for category name or code",
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
    description: "Employee categories retrieved successfully",
  })
  findAll(@Query() query: BaseQueryDto) {
    return this.employeeCategoriesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get employee category by ID",
    description:
      "Retrieves a specific employee category by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee category",
  })
  @ApiResponse({
    status: 200,
    description: "Employee category retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Employee category not found" })
  findOne(@Param("id") id: string) {
    return this.employeeCategoriesService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update employee category",
    description:
      "Updates an existing employee category with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee category to update",
  })
  @ApiBody({ type: UpdateEmployeeCategoryDto })
  @ApiResponse({
    status: 200,
    description: "Employee category updated successfully",
  })
  @ApiResponse({ status: 404, description: "Employee category not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(
    @Param("id") id: string,
    @Body() updateEmployeeCategoryDto: UpdateEmployeeCategoryDto
  ) {
    return this.employeeCategoriesService.update(
      +id,
      updateEmployeeCategoryDto
    );
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete employee category",
    description: "Deletes an employee category by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee category to delete",
  })
  @ApiResponse({
    status: 200,
    description: "Employee category deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Employee category not found" })
  remove(@Param("id") id: string) {
    return this.employeeCategoriesService.remove(+id);
  }
}
