// filepath: sae-backend/src/modules/locations/cities/cities.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { CitiesService } from "./cities.service";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";

@ApiTags("locations/cities")
@Controller("locations/cities")
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiOperation({ summary: "Get all cities" })
  @ApiResponse({ status: 200, description: "Cities retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.citiesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get city by ID" })
  @ApiParam({ name: "id", description: "City ID" })
  @ApiResponse({ status: 200 })
  findOne(@Param("id") id: string) {
    return this.citiesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: "Create city" })
  @ApiResponse({ status: 201, description: "City created successfully" })
  create(@Body() dto: CreateCityDto) {
    return this.citiesService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update city" })
  @ApiParam({ name: "id", description: "City ID" })
  @ApiResponse({ status: 200, description: "City updated successfully" })
  update(@Param("id") id: string, @Body() dto: UpdateCityDto) {
    return this.citiesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete city" })
  @ApiParam({ name: "id", description: "City ID" })
  @ApiResponse({ status: 200, description: "City deleted successfully" })
  remove(@Param("id") id: string) {
    return this.citiesService.remove(+id);
  }

  @Get("province/:provinceId")
  @ApiOperation({ summary: "Get cities by province" })
  @ApiParam({ name: "provinceId", description: "Province ID" })
  byProvince(@Param("provinceId") provinceId: string) {
    return this.citiesService.findByProvince(+provinceId);
  }

  @Get("postal-code/:postalCode")
  @ApiOperation({ summary: "Get city by postal code" })
  @ApiParam({ name: "postalCode", description: "Postal code" })
  byPostalCode(@Param("postalCode") postalCode: string) {
    return this.citiesService.findByPostalCode(postalCode);
  }
}
