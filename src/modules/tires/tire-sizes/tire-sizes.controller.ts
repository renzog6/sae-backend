import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { TireSizesService } from "./tire-sizes.service";
import { CreateTireSizeDto } from "./dto/create-tire-size.dto";
import { UpdateTireSizeDto } from "./dto/update-tire-size.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { TireSize } from "./entity/tire-size.entity";
import { BaseQueryDto } from "@common/dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("tire-sizes")
@Controller("tires/sizes")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TireSizesController extends BaseController<TireSize> {
  constructor(private readonly tireSizesService: TireSizesService) {
    super(tireSizesService, TireSize, "TireSize");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Create a new tire size" })
  @ApiBody({ type: CreateTireSizeDto })
  @ApiResponse({ status: 201, description: "Tire size created successfully" })
  override create(@Body() dto: CreateTireSizeDto) {
    return this.tireSizesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tire sizes with pagination" })
  @ApiResponse({ status: 200, description: "List of tire sizes" })
  override findAll(@Query() query: BaseQueryDto) {
    return this.tireSizesService.findAll(query);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Update tire size information" })
  @ApiBody({ type: UpdateTireSizeDto })
  @ApiResponse({ status: 200, description: "Tire size updated" })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTireSizeDto
  ) {
    return this.tireSizesService.update(id, dto);
  }

  @Get(":sizeId/aliases")
  @ApiOperation({ summary: "Get aliases for a specific tire size" })
  @ApiParam({ name: "sizeId", type: Number })
  getAliases(@Param("sizeId", ParseIntPipe) sizeId: number) {
    return this.tireSizesService.getAliases(sizeId);
  }
}

