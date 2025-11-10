// filepath: sae-backend/src/modules/locations/cities/cities.controller.ts
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
import { CitiesService } from "./cities.service";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";

@ApiTags("locations/cities")
@Controller("locations/cities")
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiOperation({ summary: "Get all cities" })
  findAll() {
    return this.citiesService.findAll().then((data) => ({ data }));
  }

  @Get(":id")
  @ApiOperation({ summary: "Get city by ID" })
  @ApiParam({ name: "id", description: "City ID" })
  @ApiResponse({ status: 200 })
  findOne(@Param("id") id: string) {
    return this.citiesService.findOne(+id).then((data) => ({ data }));
  }

  @Post()
  @ApiOperation({ summary: "Create city" })
  create(@Body() dto: CreateCityDto) {
    return this.citiesService.create(dto).then((data) => ({ data }));
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update city" })
  @ApiParam({ name: "id", description: "City ID" })
  update(@Param("id") id: string, @Body() dto: UpdateCityDto) {
    return this.citiesService.update(+id, dto).then((data) => ({ data }));
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete city" })
  @ApiParam({ name: "id", description: "City ID" })
  remove(@Param("id") id: string) {
    return this.citiesService.remove(+id).then((data) => ({ data }));
  }

  @Get("province/:provinceId")
  @ApiOperation({ summary: "Get cities by province" })
  @ApiParam({ name: "provinceId", description: "Province ID" })
  byProvince(@Param("provinceId") provinceId: string) {
    return this.citiesService
      .findByProvince(+provinceId)
      .then((data) => ({ data }));
  }

  @Get("postal-code/:postalCode")
  @ApiOperation({ summary: "Get city by postal code" })
  @ApiParam({ name: "postalCode", description: "Postal code" })
  byPostalCode(@Param("postalCode") postalCode: string) {
    return this.citiesService
      .findByPostalCode(postalCode)
      .then((data) => ({ data }));
  }
}
