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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { CountriesService } from "./countries.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";

@ApiTags("locations/countries")
@Controller("locations/countries")
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: "Get all countries" })
  @ApiResponse({ status: 200, description: "Countries retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.countriesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get country by ID" })
  @ApiParam({ name: "id", description: "Country ID" })
  @ApiResponse({ status: 200, description: "Country retrieved successfully" })
  findOne(@Param("id") id: string) {
    return this.countriesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: "Create country" })
  @ApiResponse({ status: 201, description: "Country created successfully" })
  create(@Body() dto: CreateCountryDto) {
    return this.countriesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update country" })
  @ApiParam({ name: "id", description: "Country ID" })
  @ApiResponse({ status: 200, description: "Country updated successfully" })
  update(@Param("id") id: string, @Body() dto: UpdateCountryDto) {
    return this.countriesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete country" })
  @ApiParam({ name: "id", description: "Country ID" })
  @ApiResponse({ status: 200, description: "Country deleted successfully" })
  remove(@Param("id") id: string) {
    return this.countriesService.remove(+id);
  }

  @Get(":id/provinces")
  @ApiOperation({ summary: "Get provinces by country" })
  @ApiParam({ name: "id", description: "Country ID" })
  @ApiResponse({ status: 200, description: "Provinces retrieved successfully" })
  provinces(@Param("id") id: string) {
    return this.countriesService.findProvinces(+id);
  }
}
