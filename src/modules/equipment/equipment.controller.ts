import { BaseController } from "@common/controllers/base.controller";

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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

import { EquipmentService } from "./equipment.service";
import { Equipment } from "./entities/equipment.entity";
import { CreateEquipmentDto } from "./dto/create-equipment.dto";
import { UpdateEquipmentDto } from "./dto/update-equipment.dto";
import { EquipmentQueryDto } from "./dto/equipment-query.dto";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment")
@ApiBearerAuth()
@Controller("equipments")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EquipmentController extends BaseController<Equipment> {
  constructor(private readonly equipmentService: EquipmentService) {
    super(equipmentService, Equipment, "Equipment");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
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
  @ApiResponse({ status: 200, description: "List of equipment with metadata." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  override findAll(
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
