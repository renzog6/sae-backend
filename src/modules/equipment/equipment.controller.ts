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
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";

import { EquipmentService } from "./equipment.service";
import { Equipment } from "./entities/equipment.entity";
import { CreateEquipmentDto } from "./dto/create-equipment.dto";
import { UpdateEquipmentDto } from "./dto/update-equipment.dto";
import { EquipmentQueryDto } from "./dto/equipment-query.dto";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment")
@ApiBearerAuth()
@Controller("equipments")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EquipmentController extends BaseController<Equipment> {
  constructor(private readonly equipmentService: EquipmentService) {
    super(equipmentService, Equipment, "Equipment");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create new equipment",
    description: "Creates a new equipment record.",
  })
  @ApiBody({ type: CreateEquipmentDto })
  @ApiResponse({ status: 201, description: "Equipment created successfully." })
  override create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all equipment with filters",
    description: "Retrieves equipment records with optional filters.",
  })
  @ApiResponse({ status: 200, description: "List of equipment." })
  override findAll(@Query() query: EquipmentQueryDto) {
    return this.equipmentService.findAll(query);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Update equipment",
    description: "Updates an existing equipment record.",
  })
  @ApiBody({ type: UpdateEquipmentDto })
  @ApiResponse({ status: 200, description: "Equipment updated successfully." })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto
  ) {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Delete equipment",
    description: "Deletes an equipment record.",
  })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return this.equipmentService.remove(id);
  }
}
