import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { EquipmentAxlesService } from "./equipment-axles.service";
import {
  CreateEquipmentAxleDto,
  CreateEquipmentAxleWithPositionsDto,
} from "./dto/create-equipment-axle.dto";
import { UpdateEquipmentAxleDto } from "./dto/update-equipment-axle.dto";
import { EquipmentAxleQueryDto } from "./dto/equipment-axle-query.dto";
import { EquipmentAxle } from "./entity/equipment-axle.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-axles")
@Controller("equipment-axles")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EquipmentAxlesController extends BaseController<EquipmentAxle> {
  constructor(private readonly equipmentAxlesService: EquipmentAxlesService) {
    super(equipmentAxlesService, EquipmentAxle, "EquipmentAxle");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create a new equipment axle",
    description: "Creates a new equipment axle with the provided details.",
  })
  @ApiBody({ type: CreateEquipmentAxleDto })
  @ApiResponse({
    status: 201,
    description: "Equipment axle created successfully",
  })
  override create(@Body() createEquipmentAxleDto: CreateEquipmentAxleDto) {
    return this.equipmentAxlesService.create(createEquipmentAxleDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all equipment axles with filtering",
    description: "Retrieves a paginated list of axles with optional filtering.",
  })
  @ApiResponse({
    status: 200,
    description: "Equipment axles retrieved successfully",
  })
  override findAll(@Query() query: EquipmentAxleQueryDto) {
    return this.equipmentAxlesService.findAll(query);
  }

  @Post("with-positions")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create axle with positions",
    description: "Creates a new axle and its tire positions in a transaction.",
  })
  @ApiBody({ type: CreateEquipmentAxleWithPositionsDto })
  async createWithPositions(@Body() dto: CreateEquipmentAxleWithPositionsDto) {
    return this.equipmentAxlesService.createWithPositions(dto);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateEquipmentAxleDto
  ) {
    return this.equipmentAxlesService.update(id, dto);
  }

  @Get("positions/equipment/:equipmentId")
  @ApiOperation({
    summary: "Get tire positions by equipment",
    description: "Retrieves all tire positions for a specific equipment.",
  })
  @ApiParam({
    name: "equipmentId",
    type: "number",
    description: "Unique identifier of the equipment",
  })
  @ApiResponse({
    status: 200,
    description: "Tire positions retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Equipment not found" })
  async findPositionsByEquipment(@Param("equipmentId", ParseIntPipe) equipmentId: number) {
    return this.equipmentAxlesService.findPositionsByEquipment(equipmentId);
  }
}
