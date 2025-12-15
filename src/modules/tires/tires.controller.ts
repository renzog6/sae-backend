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
import { TiresService } from "./tires.service";
import { CreateTireDto } from "./dto/create-tire.dto";
import { UpdateTireDto } from "./dto/update-tire.dto";
import { TireQueryDto } from "./dto/tire-query.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { Tire } from "./entity/tire.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("tires")
@Controller("tires")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TiresController extends BaseController<Tire> {
  constructor(private readonly tiresService: TiresService) {
    super(tiresService, Tire, "Tire");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Create a new tire" })
  @ApiBody({ type: CreateTireDto })
  @ApiResponse({ status: 201, description: "Tire created successfully" })
  override create(@Body() dto: CreateTireDto) {
    return this.tiresService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tires with pagination and filters" })
  @ApiResponse({ status: 200, description: "List of tires" })
  override findAll(@Query() query: TireQueryDto) {
    return this.tiresService.findAll(query);
  }

  @Put(":id")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Update tire information" })
  @ApiBody({ type: UpdateTireDto })
  @ApiResponse({ status: 200, description: "Tire updated successfully" })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTireDto
  ) {
    return this.tiresService.update(id, dto);
  }
}

