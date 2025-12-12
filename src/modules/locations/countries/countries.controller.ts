// filepath: sae-backend/src/modules/locations/countries/countries.controller.ts
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
import { CountriesService } from "./countries.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";

@ApiTags("locations/countries")
@Controller("locations/countries")
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({
    summary: "Get all countries with pagination",
    description:
      "Retrieves a paginated list of countries based on query parameters such as page, limit, search, and filters.",
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
    description: "Search query for country name or code",
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
  @ApiResponse({ status: 200, description: "Countries retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.countriesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get country by ID",
    description: "Retrieves a specific country by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the country",
  })
  @ApiResponse({ status: 200, description: "Country retrieved successfully" })
  @ApiResponse({ status: 404, description: "Country not found" })
  findOne(@Param("id") id: string) {
    return this.countriesService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: "Create a new country",
    description: "Creates a new country with the provided name and ISO code.",
  })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({ status: 201, description: "Country created successfully" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  create(@Body() dto: CreateCountryDto) {
    return this.countriesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update country information",
    description: "Updates an existing country with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the country to update",
  })
  @ApiBody({ type: UpdateCountryDto })
  @ApiResponse({ status: 200, description: "Country updated successfully" })
  @ApiResponse({ status: 404, description: "Country not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(@Param("id") id: string, @Body() dto: UpdateCountryDto) {
    return this.countriesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete country",
    description: "Deletes a country by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the country to delete",
  })
  @ApiResponse({ status: 200, description: "Country deleted successfully" })
  @ApiResponse({ status: 404, description: "Country not found" })
  remove(@Param("id") id: string) {
    return this.countriesService.remove(+id);
  }

  @Get(":id/provinces")
  @ApiOperation({
    summary: "Get provinces by country",
    description: "Retrieves all provinces that belong to a specific country.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the country",
  })
  @ApiResponse({ status: 200, description: "Provinces retrieved successfully" })
  @ApiResponse({ status: 404, description: "Country not found" })
  provinces(@Param("id") id: string) {
    return this.countriesService.findProvinces(+id);
  }
}
