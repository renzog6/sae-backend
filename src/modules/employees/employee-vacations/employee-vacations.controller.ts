// filepath: sae-backend/src/modules/employees/employee-vacations/employee-vacations.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Res,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiProduces,
} from "@nestjs/swagger";
import { Response } from "express";
import { BaseQueryDto } from "@common/dto";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { CreateEmployeeVacationDto } from "./dto/create-employee-vacation.dto";
import { UpdateEmployeeVacationDto } from "./dto/update-employee-vacation.dto";

@ApiTags("employee-vacations")
@Controller("employee-vacations")
export class EmployeeVacationsController {
  constructor(
    private readonly employeeVacationsService: EmployeeVacationsService
  ) {}

  @Post()
  @ApiOperation({
    summary: "Create a new employee vacation",
    description:
      "Creates a new vacation record for an employee with the provided details including days, dates, and type.",
  })
  @ApiBody({ type: CreateEmployeeVacationDto })
  @ApiResponse({
    status: 201,
    description: "Employee vacation created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Employee not found" })
  create(@Body() createEmployeeVacationDto: CreateEmployeeVacationDto) {
    return this.employeeVacationsService.create(createEmployeeVacationDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all employee vacations with pagination",
    description:
      "Retrieves a paginated list of employee vacations based on query parameters.",
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
    description: "Search query for vacation details",
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
    description: "Employee vacations retrieved successfully",
  })
  findAll(@Query() query: BaseQueryDto) {
    return this.employeeVacationsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get employee vacation by ID",
    description:
      "Retrieves a specific employee vacation by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee vacation",
  })
  @ApiResponse({
    status: 200,
    description: "Employee vacation retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Employee vacation not found" })
  findOne(@Param("id") id: string) {
    return this.employeeVacationsService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update employee vacation",
    description:
      "Updates an existing employee vacation with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee vacation to update",
  })
  @ApiBody({ type: UpdateEmployeeVacationDto })
  @ApiResponse({
    status: 200,
    description: "Employee vacation updated successfully",
  })
  @ApiResponse({ status: 404, description: "Employee vacation not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(
    @Param("id") id: string,
    @Body() updateEmployeeVacationDto: UpdateEmployeeVacationDto
  ) {
    return this.employeeVacationsService.update(+id, updateEmployeeVacationDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete employee vacation",
    description: "Deletes an employee vacation by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee vacation to delete",
  })
  @ApiResponse({
    status: 200,
    description: "Employee vacation deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Employee vacation not found" })
  remove(@Param("id") id: string) {
    return this.employeeVacationsService.remove(+id);
  }

  @Get(":id/pdf")
  @ApiOperation({
    summary: "Download vacation PDF",
    description:
      "Generates and downloads a PDF document containing vacation details.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the employee vacation",
  })
  @ApiProduces("application/pdf")
  @ApiResponse({
    status: 200,
    description: "PDF generated successfully",
    schema: {
      type: "string",
      format: "binary",
    },
  })
  @ApiResponse({ status: 404, description: "Employee vacation not found" })
  async downloadPdf(@Param("id") id: string, @Res() res: Response) {
    const pdfBuffer = await this.employeeVacationsService.generateVacationPdf(
      Number(id)
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="vacaciones_${id}.pdf"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);
    res.end(pdfBuffer);
  }
}
