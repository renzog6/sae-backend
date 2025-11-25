// filepath: sae-backend/src/modules/equipment/controllers/equipment.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { EquipmentService } from "../services/equipment.service";
import { CreateEquipmentDto } from "../dto/create-equipment.dto";
import { UpdateEquipmentDto } from "../dto/update-equipment.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { EquipmentQueryDto } from "../dto/equipment-query.dto";

@ApiTags("equipment")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("equipments")
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  // -------------------------------------------------------------------------
  // CREATE
  // -------------------------------------------------------------------------
  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({
    summary: "Create a new equipment",
    description: "Creates a new equipment record with the provided details.",
  })
  @ApiBody({
    type: CreateEquipmentDto,
    description: "Data required to create a new equipment record.",
  })
  @ApiResponse({
    status: 201,
    description: "The equipment has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid request data." })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  // -------------------------------------------------------------------------
  // FIND ALL (UPDATED WITH FILTERS + PAGINATION)
  // -------------------------------------------------------------------------
  @Get()
  @ApiOperation({
    summary: "Get all equipment with filters and pagination",
    description:
      "Retrieves all equipment records with optional filters and pagination parameters.",
  })
  @ApiQuery({
    name: "typeId",
    required: false,
    type: Number,
    description: "Filter by equipment type ID.",
  })
  @ApiQuery({
    name: "modelId",
    required: false,
    type: Number,
    description: "Filter by equipment model ID.",
  })
  @ApiQuery({
    name: "categoryId",
    required: false,
    type: Number,
    description: "Filter by equipment category ID.",
  })
  @ApiQuery({
    name: "year",
    required: false,
    type: Number,
    description: "Filter by equipment year.",
  })
  @ApiQuery({
    name: "search",
    required: false,
    type: String,
    description:
      "Search term to filter by license plate, internal code, or description.",
  })
  @ApiQuery({
    name: "skip",
    required: false,
    type: Number,
    example: 0,
    description: "Number of records to skip for pagination (default: 0).",
  })
  @ApiQuery({
    name: "take",
    required: false,
    type: Number,
    example: 25,
    description: "Number of records to take for pagination (default: 25).",
  })
  @ApiResponse({ status: 200, description: "List of equipment with metadata." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  findAll(
    @Query() query: EquipmentQueryDto,
    @Query("typeId") typeId?: number,
    @Query("modelId") modelId?: number,
    @Query("categoryId") categoryId?: number,
    @Query("year") year?: number
  ) {
    return this.equipmentService.findAll(
      query,
      typeId,
      modelId,
      categoryId,
      year
    );
  }
  // -------------------------------------------------------------------------
  // FIND ONE
  // -------------------------------------------------------------------------
  @Get(":id")
  @ApiOperation({
    summary: "Get equipment by ID",
    description:
      "Retrieves a single equipment record along with its related entities.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Unique identifier of the equipment record.",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Equipment record found." })
  @ApiResponse({ status: 404, description: "Equipment not found." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  findOne(@Param("id") id: string) {
    return this.equipmentService.findOne(+id);
  }

  // -------------------------------------------------------------------------
  // UPDATE
  // -------------------------------------------------------------------------
  @Put(":id")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({
    summary: "Update equipment by ID",
    description:
      "Updates an existing equipment record based on the provided ID and data.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Unique identifier of the equipment to update.",
    example: 1,
  })
  @ApiBody({
    type: UpdateEquipmentDto,
    description: "Fields to update in the equipment record.",
  })
  @ApiResponse({
    status: 200,
    description: "The equipment has been successfully updated.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 404, description: "Equipment not found." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  update(
    @Param("id") id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto
  ) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  // -------------------------------------------------------------------------
  // DELETE
  // -------------------------------------------------------------------------
  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Delete equipment by ID",
    description:
      "Deletes an equipment record permanently based on its unique ID.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Unique identifier of the equipment to delete.",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "The equipment has been successfully deleted.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 404, description: "Equipment not found." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  remove(@Param("id") id: string) {
    return this.equipmentService.remove(+id);
  }

  // -------------------------------------------------------------------------
  // CATEGORY ROUTES
  // -------------------------------------------------------------------------
  @Get("categories/all")
  @ApiOperation({
    summary: "Get all equipment categories",
    description: "Retrieves a list of all equipment categories available.",
  })
  @ApiResponse({
    status: 200,
    description: "List of all equipment categories.",
  })
  @ApiResponse({ status: 500, description: "Internal server error." })
  findCategories() {
    return this.equipmentService.findCategories();
  }

  @Get("categories/:id")
  @ApiOperation({
    summary: "Get equipment category by ID",
    description: "Retrieves a single equipment category and its related types.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Unique identifier of the category.",
  })
  @ApiResponse({
    status: 200,
    description: "The equipment category was successfully retrieved.",
  })
  @ApiResponse({ status: 404, description: "Equipment category not found." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  findCategory(@Param("id") id: string) {
    return this.equipmentService.findCategory(+id);
  }

  // -------------------------------------------------------------------------
  // TYPE ROUTES
  // -------------------------------------------------------------------------
  @Get("types/all")
  @ApiOperation({
    summary: "Get all equipment types",
    description:
      "Retrieves all equipment types, optionally filtered by category ID.",
  })
  @ApiQuery({
    name: "categoryId",
    required: false,
    type: Number,
    description: "Optional category ID to filter types.",
  })
  @ApiResponse({
    status: 200,
    description: "List of equipment types retrieved successfully.",
  })
  @ApiResponse({ status: 500, description: "Internal server error." })
  findTypes(@Query("categoryId") categoryId?: number) {
    return this.equipmentService.findTypes(categoryId);
  }

  @Get("types/:id")
  @ApiOperation({
    summary: "Get equipment type by ID",
    description: "Retrieves a single equipment type and its related category.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Unique identifier of the equipment type.",
  })
  @ApiResponse({
    status: 200,
    description: "The equipment type was successfully retrieved.",
  })
  @ApiResponse({ status: 404, description: "Equipment type not found." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  findType(@Param("id") id: string) {
    return this.equipmentService.findType(+id);
  }

  // -------------------------------------------------------------------------
  // MODEL ROUTES
  // -------------------------------------------------------------------------
  @Get("models/all")
  @ApiOperation({
    summary: "Get all equipment models",
    description:
      "Retrieves all equipment models, optionally filtered by equipment type ID.",
  })
  @ApiQuery({
    name: "typeId",
    required: false,
    type: Number,
    description: "Optional type ID to filter models.",
  })
  @ApiResponse({
    status: 200,
    description: "List of equipment models retrieved successfully.",
  })
  @ApiResponse({ status: 500, description: "Internal server error." })
  findModels(@Query("typeId") typeId?: number) {
    return this.equipmentService.findModels(typeId);
  }

  @Get("models/:id")
  @ApiOperation({
    summary: "Get equipment model by ID",
    description:
      "Retrieves a single equipment model with its brand and type information.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Unique identifier of the equipment model.",
  })
  @ApiResponse({
    status: 200,
    description: "The equipment model was successfully retrieved.",
  })
  @ApiResponse({ status: 404, description: "Equipment model not found." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  findModel(@Param("id") id: string) {
    return this.equipmentService.findModel(+id);
  }
}
