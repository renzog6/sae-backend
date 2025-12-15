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
import { EquipmentModelService } from "./equipment-model.service";
import { CreateEquipmentModelDto } from "./dto/create-equipment-model.dto";
import { EquipmentModel } from "./entity/equipment-model.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-models")
@Controller("equipment-models")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EquipmentModelController extends BaseController<EquipmentModel> {
  constructor(private readonly equipmentModelService: EquipmentModelService) {
    super(equipmentModelService, EquipmentModel, "EquipmentModel");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create a new equipment model",
    description: "Creates a new equipment model with the provided name and details.",
  })
  @ApiBody({ type: CreateEquipmentModelDto })
  @ApiResponse({
    status: 201,
    description: "Equipment model created successfully",
  })
  override create(@Body() createEquipmentModelDto: CreateEquipmentModelDto) {
    return this.equipmentModelService.create(createEquipmentModelDto);
  }

  @Get("by-type/:typeId")
  @ApiOperation({ summary: "Get equipment models by type" })
  @ApiParam({ name: "typeId", type: "number" })
  async findByType(@Param("typeId", ParseIntPipe) typeId: number) {
    return this.equipmentModelService.findByType(typeId);
  }
}
