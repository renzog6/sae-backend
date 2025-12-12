// filepath: sae-backend/src/modules/inspections/controllers/inspections.controller.ts
import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger";
import { InspectionsService } from "@modules/inspections/services/inspections.service";
import { BaseQueryDto } from "@common/dto";

@ApiTags("inspections")
@Controller("inspections")
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Get()
  @ApiOperation({
    summary: "Get all inspections with pagination",
    description:
      "Retrieves a paginated list of inspections based on query parameters such as page, limit, search, and filters.",
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
    description:
      "Search query for equipment name, employee name, or inspection type",
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    type: String,
    description: "Sort field (default: createdAt)",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    type: String,
    description: "Sort order (asc/desc, default: desc)",
  })
  @ApiResponse({
    status: 200,
    description: "Inspections retrieved successfully",
  })
  findAll(@Query() query: BaseQueryDto) {
    return this.inspectionsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get inspection by ID",
    description: "Retrieves a specific inspection by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the inspection",
  })
  @ApiResponse({
    status: 200,
    description: "Inspection retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Inspection not found" })
  findOne(@Param("id") id: string) {
    return this.inspectionsService.findOne(+id);
  }

  @Get("types")
  @ApiOperation({
    summary: "Get all inspection types",
    description: "Retrieves a list of all available inspection types.",
  })
  @ApiResponse({
    status: 200,
    description: "Inspection types retrieved successfully",
  })
  findInspectionTypes() {
    return this.inspectionsService.findInspectionTypes();
  }
}
