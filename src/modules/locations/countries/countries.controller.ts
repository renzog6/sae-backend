// filepath: sae-backend/src/modules/locations/countries/countries.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CountriesService } from "./countries.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";

@ApiTags("locations/countries")
@Controller("locations/countries")
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiOperation({ summary: "Get all countries" })
  findAll() {
    return this.countriesService.findAll().then((data) => ({ data }));
  }

  @Get(":id")
  @ApiOperation({ summary: "Get country by ID" })
  @ApiParam({ name: "id", description: "Country ID" })
  findOne(@Param("id") id: string) {
    return this.countriesService.findOne(+id).then((data) => ({ data }));
  }

  @Post()
  @ApiOperation({ summary: "Create country" })
  create(@Body() dto: CreateCountryDto) {
    return this.countriesService.create(dto).then((data) => ({ data }));
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update country" })
  @ApiParam({ name: "id", description: "Country ID" })
  update(@Param("id") id: string, @Body() dto: UpdateCountryDto) {
    return this.countriesService.update(+id, dto).then((data) => ({ data }));
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete country" })
  @ApiParam({ name: "id", description: "Country ID" })
  remove(@Param("id") id: string) {
    return this.countriesService.remove(+id).then((data) => ({ data }));
  }

  @Get(":id/provinces")
  @ApiOperation({ summary: "Get provinces by country" })
  @ApiParam({ name: "id", description: "Country ID" })
  provinces(@Param("id") id: string) {
    return this.countriesService.findProvinces(+id).then((data) => ({ data }));
  }
}
