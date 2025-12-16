import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CountriesService } from "./countries.service";
// import { UpdateCountryDto } from "./dto/update-country.dto";
import { Country } from "./entities/country.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("locations/countries")
@Controller("locations/countries")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CountriesController extends BaseController<Country> {
  constructor(private readonly countriesService: CountriesService) {
    super(countriesService, Country, "Country");
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete country" })
  @ApiParam({ name: "id", type: "number" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return super.remove(id);
  }

  // Custom methods start here


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
