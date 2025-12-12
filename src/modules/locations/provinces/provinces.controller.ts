// filepath: sae-backend/src/modules/locations/provinces/provinces.controller.ts
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
  ApiParam,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto";
import { ProvincesService } from "./provinces.service";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@ApiTags("locations/provinces")
@Controller("locations/provinces")
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  @ApiOperation({
    summary: "Get all provinces with pagination",
    description:
      "Retrieves a paginated list of provinces based on query parameters such as page, limit, search, and filters.",
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
    description: "Search query for province name or code",
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
  @ApiResponse({ status: 200, description: "Provinces retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.provincesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get province by ID",
    description: "Retrieves a specific province by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the province",
  })
  @ApiResponse({ status: 200, description: "Province retrieved successfully" })
  @ApiResponse({ status: 404, description: "Province not found" })
  findOne(@Param("id") id: string) {
    return this.provincesService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: "Create a new province",
    description:
      "Creates a new province with the provided name, code, and country association.",
  })
  @ApiBody({ type: CreateProvinceDto })
  @ApiResponse({ status: 201, description: "Province created successfully" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  create(@Body() dto: CreateProvinceDto) {
    return this.provincesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update province information",
    description: "Updates an existing province with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the province to update",
  })
  @ApiBody({ type: UpdateProvinceDto })
  @ApiResponse({ status: 200, description: "Province updated successfully" })
  @ApiResponse({ status: 404, description: "Province not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(@Param("id") id: string, @Body() dto: UpdateProvinceDto) {
    return this.provincesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete province",
    description: "Deletes a province by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the province to delete",
  })
  @ApiResponse({ status: 200, description: "Province deleted successfully" })
  @ApiResponse({ status: 404, description: "Province not found" })
  remove(@Param("id") id: string) {
    return this.provincesService.remove(+id);
  }

  @Get("code/:code")
  @ApiOperation({
    summary: "Get province by code",
    description: "Retrieves a province by its unique code.",
  })
  @ApiParam({
    name: "code",
    type: "string",
    description: "Unique code of the province",
  })
  @ApiResponse({ status: 200, description: "Province retrieved successfully" })
  @ApiResponse({ status: 404, description: "Province not found" })
  byCode(@Param("code") code: string) {
    return this.provincesService.findByCode(code);
  }

  @Get("country/:countryId")
  @ApiOperation({
    summary: "Get provinces by country",
    description: "Retrieves all provinces that belong to a specific country.",
  })
  @ApiParam({
    name: "countryId",
    type: "number",
    description: "Unique identifier of the country",
  })
  @ApiResponse({ status: 200, description: "Provinces retrieved successfully" })
  @ApiResponse({ status: 404, description: "Country not found" })
  byCountry(@Param("countryId") countryId: string) {
    return this.provincesService.findByCountry(+countryId);
  }
}
