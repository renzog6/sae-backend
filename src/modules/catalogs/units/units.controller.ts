// filepath: sae-backend/src/modules/catalogs/units/units.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UnitsService } from "./units.service";
import { CreateUnitDto } from "./dto/create-unit.dto";
import { UpdateUnitDto } from "./dto/update-unit.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { BaseQueryDto } from "@common/dto/base-query.dto";

@ApiTags("units")
@Controller("units")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new unit" })
  @ApiResponse({ status: 201, description: "Unit created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.create(createUnitDto).then((data) => ({ data }));
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all units" })
  @ApiResponse({ status: 200, description: "Units retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.unitsService.findAll(query);
  }

  @Get(":id(\\d+)")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a unit by ID" })
  @ApiResponse({ status: 200, description: "Unit retrieved successfully" })
  @ApiResponse({ status: 404, description: "Unit not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.unitsService.findOne(id).then((data) => ({ data }));
  }

  @Patch(":id(\\d+)")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a unit" })
  @ApiResponse({ status: 200, description: "Unit updated successfully" })
  @ApiResponse({ status: 404, description: "Unit not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUnitDto: UpdateUnitDto
  ) {
    return this.unitsService
      .update(id, updateUnitDto)
      .then((data) => ({ data }));
  }

  @Delete(":id(\\d+)")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a unit (soft delete)" })
  @ApiResponse({ status: 200, description: "Unit deleted successfully" })
  @ApiResponse({ status: 404, description: "Unit not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.unitsService.remove(id).then((data) => ({ data }));
  }

  @Patch(":id(\\d+)/restore")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Restore a deleted unit" })
  @ApiResponse({ status: 200, description: "Unit restored successfully" })
  @ApiResponse({ status: 404, description: "Unit not found" })
  restore(@Param("id", ParseIntPipe) id: number) {
    return this.unitsService.restore(id).then((data) => ({ data }));
  }
}
