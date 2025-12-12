// filepath: sae-backend/src/modules/locations/cities/cities.controller.ts
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
import { CitiesService } from "./cities.service";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";

@ApiTags("locations/cities")
@Controller("locations/cities")
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiOperation({
    summary: "Get all cities with pagination",
    description:
      "Retrieves a paginated list of cities based on query parameters such as page, limit, search, and filters.",
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
    description: "Search query for city name or postal code",
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
  @ApiResponse({ status: 200, description: "Cities retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.citiesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get city by ID",
    description: "Retrieves a specific city by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the city",
  })
  @ApiResponse({ status: 200, description: "City retrieved successfully" })
  @ApiResponse({ status: 404, description: "City not found" })
  findOne(@Param("id") id: string) {
    return this.citiesService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: "Create a new city",
    description:
      "Creates a new city with the provided name, postal code, and province association.",
  })
  @ApiBody({ type: CreateCityDto })
  @ApiResponse({ status: 201, description: "City created successfully" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  create(@Body() dto: CreateCityDto) {
    return this.citiesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update city information",
    description: "Updates an existing city with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the city to update",
  })
  @ApiBody({ type: UpdateCityDto })
  @ApiResponse({ status: 200, description: "City updated successfully" })
  @ApiResponse({ status: 404, description: "City not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(@Param("id") id: string, @Body() dto: UpdateCityDto) {
    return this.citiesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete city",
    description: "Deletes a city by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the city to delete",
  })
  @ApiResponse({ status: 200, description: "City deleted successfully" })
  @ApiResponse({ status: 404, description: "City not found" })
  remove(@Param("id") id: string) {
    return this.citiesService.remove(+id);
  }

  @Get("province/:provinceId")
  @ApiOperation({
    summary: "Get cities by province",
    description: "Retrieves all cities that belong to a specific province.",
  })
  @ApiParam({
    name: "provinceId",
    type: "number",
    description: "Unique identifier of the province",
  })
  @ApiResponse({ status: 200, description: "Cities retrieved successfully" })
  @ApiResponse({ status: 404, description: "Province not found" })
  byProvince(@Param("provinceId") provinceId: string) {
    return this.citiesService.findByProvince(+provinceId);
  }

  @Get("postal-code/:postalCode")
  @ApiOperation({
    summary: "Get city by postal code",
    description: "Retrieves a city by its postal code.",
  })
  @ApiParam({
    name: "postalCode",
    type: "string",
    description: "Postal code of the city",
  })
  @ApiResponse({ status: 200, description: "City retrieved successfully" })
  @ApiResponse({ status: 404, description: "City not found" })
  byPostalCode(@Param("postalCode") postalCode: string) {
    return this.citiesService.findByPostalCode(postalCode);
  }
}
