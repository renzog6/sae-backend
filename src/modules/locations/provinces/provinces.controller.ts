// filepath: sae-backend/src/modules/locations/provinces/provinces.controller.ts
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
import { ProvincesService } from "./provinces.service";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@ApiTags("locations/provinces")
@Controller("locations/provinces")
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  @ApiOperation({ summary: "Get all provinces" })
  findAll() {
    return this.provincesService.findAll().then((data) => ({ data }));
  }

  @Get(":id")
  @ApiOperation({ summary: "Get province by ID" })
  @ApiParam({ name: "id", description: "Province ID" })
  findOne(@Param("id") id: string) {
    return this.provincesService.findOne(+id).then((data) => ({ data }));
  }

  @Post()
  @ApiOperation({ summary: "Create province" })
  create(@Body() dto: CreateProvinceDto) {
    return this.provincesService.create(dto).then((data) => ({ data }));
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update province" })
  @ApiParam({ name: "id", description: "Province ID" })
  update(@Param("id") id: string, @Body() dto: UpdateProvinceDto) {
    return this.provincesService.update(+id, dto).then((data) => ({ data }));
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete province" })
  @ApiParam({ name: "id", description: "Province ID" })
  remove(@Param("id") id: string) {
    return this.provincesService.remove(+id).then((data) => ({ data }));
  }

  @Get("code/:code")
  @ApiOperation({ summary: "Get province by code" })
  @ApiParam({ name: "code", description: "Province code" })
  byCode(@Param("code") code: string) {
    return this.provincesService.findByCode(code).then((data) => ({ data }));
  }

  @Get("country/:countryId")
  @ApiOperation({ summary: "Get provinces by country" })
  @ApiParam({ name: "countryId", description: "Country ID" })
  byCountry(@Param("countryId") countryId: string) {
    return this.provincesService
      .findByCountry(+countryId)
      .then((data) => ({ data }));
  }
}
