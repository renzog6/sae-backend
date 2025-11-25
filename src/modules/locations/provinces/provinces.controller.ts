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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { ProvincesService } from "./provinces.service";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@ApiTags("locations/provinces")
@Controller("locations/provinces")
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  @ApiOperation({ summary: "Get all provinces" })
  @ApiResponse({ status: 200, description: "Provinces retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.provincesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get province by ID" })
  @ApiParam({ name: "id", description: "Province ID" })
  @ApiResponse({ status: 200, description: "Province retrieved successfully" })
  findOne(@Param("id") id: string) {
    return this.provincesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: "Create province" })
  @ApiResponse({ status: 201, description: "Province created successfully" })
  create(@Body() dto: CreateProvinceDto) {
    return this.provincesService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update province" })
  @ApiParam({ name: "id", description: "Province ID" })
  @ApiResponse({ status: 200, description: "Province updated successfully" })
  update(@Param("id") id: string, @Body() dto: UpdateProvinceDto) {
    return this.provincesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete province" })
  @ApiParam({ name: "id", description: "Province ID" })
  @ApiResponse({ status: 200, description: "Province deleted successfully" })
  remove(@Param("id") id: string) {
    return this.provincesService.remove(+id);
  }

  @Get("code/:code")
  @ApiOperation({ summary: "Get province by code" })
  @ApiParam({ name: "code", description: "Province code" })
  @ApiResponse({ status: 200, description: "Province retrieved successfully" })
  byCode(@Param("code") code: string) {
    return this.provincesService.findByCode(code);
  }

  @Get("country/:countryId")
  @ApiOperation({ summary: "Get provinces by country" })
  @ApiParam({ name: "countryId", description: "Country ID" })
  @ApiResponse({ status: 200, description: "Provinces retrieved successfully" })
  byCountry(@Param("countryId") countryId: string) {
    return this.provincesService.findByCountry(+countryId);
  }
}
