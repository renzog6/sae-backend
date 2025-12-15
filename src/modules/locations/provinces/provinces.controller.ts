import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ProvincesService } from "./provinces.service";
import { CreateProvinceDto } from "./dto/create-province.dto";
// import { UpdateProvinceDto } from "./dto/update-province.dto";
import { Province } from "./entities/province.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("locations/provinces")
@Controller("locations/provinces")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ProvincesController extends BaseController<Province> {
  constructor(private readonly provincesService: ProvincesService) {
    super(provincesService, Province, "Province");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }

  // Custom methods start here


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
