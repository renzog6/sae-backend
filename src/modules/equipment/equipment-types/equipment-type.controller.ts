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
import { EquipmentTypeService } from "./equipment-type.service";
import { CreateEquipmentTypeDto } from "./dto/create-equipment-type.dto";
import { EquipmentType } from "./entity/equipment-type.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-types")
@Controller("equipment-types")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EquipmentTypeController extends BaseController<EquipmentType> {
  constructor(private readonly equipmentTypeService: EquipmentTypeService) {
    super(equipmentTypeService, EquipmentType, "EquipmentType");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create a new equipment type",
    description: "Creates a new equipment type with the provided name and details.",
  })
  @ApiBody({ type: CreateEquipmentTypeDto })
  @ApiResponse({
    status: 201,
    description: "Equipment type created successfully",
  })
  override create(@Body() createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypeService.create(createEquipmentTypeDto);
  }

  @Get("by-category/:categoryId")
  @ApiOperation({ summary: "Get equipment types by category" })
  @ApiParam({ name: "categoryId", type: "number" })
  async findByCategory(@Param("categoryId", ParseIntPipe) categoryId: number) {
    return this.equipmentTypeService.findByCategory(categoryId);
  }
}
