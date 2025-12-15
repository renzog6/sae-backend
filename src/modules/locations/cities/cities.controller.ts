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
import { CitiesService } from "./cities.service";
import { CreateCityDto } from "./dto/create-city.dto";
// import { UpdateCityDto } from "./dto/update-city.dto";
import { City } from "./entities/city.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("locations/cities")
@Controller("locations/cities")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CitiesController extends BaseController<City> {
  constructor(private readonly citiesService: CitiesService) {
    super(citiesService, City, "City");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }

  // Custom methods start here


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
