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
} from "@nestjs/swagger";
import { InspectionsService } from "@modules/inspections/services/inspections.service";
import { CreateInspectionDto } from "../dto/create-inspection.dto";
import { UpdateInspectionDto } from "../dto/update-inspection.dto";
import { Inspection } from "../entities/inspection.entity";
import { BaseQueryDto } from "@common/dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("inspections")
@Controller("inspections")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class InspectionsController extends BaseController<Inspection> {
  constructor(private readonly inspectionsService: InspectionsService) {
    super(inspectionsService, Inspection, "Inspection");
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Create inspection" })
  @ApiBody({ type: CreateInspectionDto })
  @ApiResponse({ status: 201, description: "Inspection created" })
  override create(@Body() createInspectionDto: CreateInspectionDto) {
    return this.inspectionsService.create(createInspectionDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all inspections" })
  @ApiResponse({ status: 200, description: "Inspections retrieved" })
  override findAll(@Query() query: BaseQueryDto) {
    return this.inspectionsService.findAll(query);
  }

  @Put(":id")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Update inspection" })
  @ApiBody({ type: UpdateInspectionDto })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateInspectionDto
  ) {
    return this.inspectionsService.update(id, dto);
  }
}
