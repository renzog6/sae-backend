// filepath: sae-backend/src/modules/equipment/controllers/equipment-axles.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
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
import { EquipmentAxlesService } from "../services/equipment-axles.service";
import {
  CreateEquipmentAxleDto,
  CreateEquipmentAxleWithPositionsDto,
} from "../dto/create-equipment-axle.dto";
import { UpdateEquipmentAxleDto } from "../dto/update-equipment-axle.dto";
import { EquipmentAxleQueryDto } from "../dto/equipment-axle-query.dto";

@ApiTags("equipment-axles")
@Controller("equipments/axles")
export class EquipmentAxlesController {
  constructor(private readonly service: EquipmentAxlesService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new equipment axle",
    description:
      "Creates a new axle for the specified equipment with the provided configuration.",
  })
  @ApiBody({ type: CreateEquipmentAxleDto })
  @ApiResponse({
    status: 201,
    description: "Equipment axle created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Equipment not found" })
  create(@Body() dto: CreateEquipmentAxleDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all equipment axles with pagination",
    description:
      "Retrieves a paginated list of equipment axles based on query parameters.",
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
    description: "Search query for axle description",
  })
  @ApiQuery({
    name: "equipmentId",
    required: false,
    type: Number,
    description: "Filter by equipment ID",
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
    description: "Equipment axles retrieved successfully",
  })
  findAll(@Query() query: EquipmentAxleQueryDto) {
    return this.service.findAll(query);
  }

  @Get("positions/equipment/:equipmentId")
  @ApiOperation({
    summary: "Get tire positions by equipment",
    description: "Retrieves all tire positions for a specific equipment.",
  })
  @ApiParam({
    name: "equipmentId",
    type: "number",
    description: "Unique identifier of the equipment",
  })
  @ApiResponse({
    status: 200,
    description: "Tire positions retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Equipment not found" })
  findPositionsByEquipment(@Param("equipmentId") equipmentId: string) {
    return this.service.findPositionsByEquipment(+equipmentId);
  }

  @Post("with-positions")
  @ApiOperation({
    summary: "Create axle with tire positions",
    description:
      "Creates a new axle along with its associated tire positions in a single operation.",
  })
  @ApiBody({ type: CreateEquipmentAxleWithPositionsDto })
  @ApiResponse({
    status: 201,
    description: "Equipment axle with positions created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Equipment not found" })
  createWithPositions(@Body() dto: CreateEquipmentAxleWithPositionsDto) {
    return this.service.createWithPositions(dto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get equipment axle by ID",
    description:
      "Retrieves a specific equipment axle by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the equipment axle",
  })
  @ApiResponse({
    status: 200,
    description: "Equipment axle retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Equipment axle not found" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update equipment axle",
    description: "Updates an existing equipment axle with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the equipment axle to update",
  })
  @ApiBody({ type: UpdateEquipmentAxleDto })
  @ApiResponse({
    status: 200,
    description: "Equipment axle updated successfully",
  })
  @ApiResponse({ status: 404, description: "Equipment axle not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(@Param("id") id: string, @Body() dto: UpdateEquipmentAxleDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete equipment axle",
    description: "Deletes an equipment axle by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the equipment axle to delete",
  })
  @ApiResponse({
    status: 200,
    description: "Equipment axle deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Equipment axle not found" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
