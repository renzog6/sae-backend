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
import { TireModelsService } from "./tire-models.service";
import { CreateTireModelDto } from "./dto/create-tire-model.dto";
import { UpdateTireModelDto } from "./dto/update-tire-model.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { TireModel } from "./entity/tire-model.entity";
import { BaseQueryDto } from "@common/dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("tire-models")
@Controller("tires/models")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TireModelsController extends BaseController<TireModel> {
  constructor(private readonly tireModelsService: TireModelsService) {
    super(tireModelsService, TireModel, "TireModel");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Create a new tire model" })
  @ApiBody({ type: CreateTireModelDto })
  @ApiResponse({ status: 201, description: "Tire model created successfully" })
  override create(@Body() dto: CreateTireModelDto) {
    return this.tireModelsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tire models with pagination" })
  @ApiResponse({ status: 200, description: "List of tire models" })
  override findAll(@Query() query: BaseQueryDto) {
    return this.tireModelsService.findAll(query);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Update tire model information" })
  @ApiBody({ type: UpdateTireModelDto })
  @ApiResponse({ status: 200, description: "Tire model updated" })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTireModelDto
  ) {
    return this.tireModelsService.update(id, dto);
  }
}

