// filepath: sae-backend/src/modules/persons/family/family.controller.ts
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
  ApiParam,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { FamilyService } from "@modules/persons/services/family.service";
import { CreateFamilyDto } from "@modules/persons/dto/create-family.dto";
import { UpdateFamilyDto } from "@modules/persons/dto/update-family.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("family")
@Controller("persons/family")
@UseGuards(RolesGuard)
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({
    summary: "Create a new family relationship",
    description: "Creates a new family relationship between two persons",
  })
  @ApiBody({ type: CreateFamilyDto })
  @ApiResponse({
    status: 201,
    description: "Family relationship created successfully",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            relationship: { type: "string" },
            person: { type: "object" },
            relative: { type: "object" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Not found - Person not found" })
  create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familyService.create(createFamilyDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({
    summary: "Get all family relationships",
    description:
      "Retrieves all family relationships with pagination and filtering",
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
    description: "Items per page (max 100)",
  })
  @ApiQuery({
    name: "q",
    required: false,
    type: String,
    description: "Search query for relationship or person names",
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
    description: "Sort order: asc or desc",
  })
  @ApiResponse({
    status: 200,
    description: "Family relationships retrieved successfully",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              relationship: { type: "string" },
              person: { type: "object" },
              relative: { type: "object" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
        meta: {
          type: "object",
          properties: {
            total: { type: "number" },
            page: { type: "number" },
            limit: { type: "number" },
            totalPages: { type: "number" },
          },
        },
      },
    },
  })
  findAll(@Query() query: BaseQueryDto): Promise<BaseResponseDto<any>> {
    return this.familyService.findAll(query);
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({
    summary: "Get a family relationship by ID",
    description: "Retrieves a specific family relationship by its ID",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Family relationship ID",
  })
  @ApiResponse({
    status: 200,
    description: "Family relationship found",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            relationship: { type: "string" },
            person: { type: "object" },
            relative: { type: "object" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: "Family relationship not found" })
  findOne(@Param("id") id: string) {
    return this.familyService.findOne(+id);
  }

  @Put(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({
    summary: "Update a family relationship",
    description: "Updates an existing family relationship",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Family relationship ID",
  })
  @ApiBody({ type: UpdateFamilyDto })
  @ApiResponse({
    status: 200,
    description: "Family relationship updated successfully",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            relationship: { type: "string" },
            person: { type: "object" },
            relative: { type: "object" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Family relationship not found" })
  update(@Param("id") id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familyService.update(+id, updateFamilyDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({
    summary: "Delete a family relationship",
    description: "Deletes a family relationship by ID",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Family relationship ID",
  })
  @ApiResponse({
    status: 200,
    description: "Family relationship deleted successfully",
    schema: {
      type: "object",
      properties: {
        data: { type: "object" },
        message: { type: "string" },
      },
    },
  })
  @ApiResponse({ status: 404, description: "Family relationship not found" })
  remove(@Param("id") id: string) {
    return this.familyService.remove(+id);
  }
}
