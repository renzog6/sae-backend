import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { EquipmentModelService } from "../services/equipment-model.service";
import { CreateEquipmentModelDto } from "../dto/create-equipment-model.dto";
import { UpdateEquipmentModelDto } from "../dto/update-equipment-model.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles, Role } from "../../common/decorators/roles.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Pagination } from "../../common/decorators/pagination.decorator";

@ApiTags("equipment-models")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("equipments/models")
export class EquipmentModelController {
  constructor(private readonly equipmentModelService: EquipmentModelService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Create a new equipment model" })
  @ApiResponse({
    status: 201,
    description: "The equipment model has been successfully created.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  create(@Body() createEquipmentModelDto: CreateEquipmentModelDto) {
    return this.equipmentModelService.create(createEquipmentModelDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all equipment models with pagination" })
  @ApiResponse({ status: 200, description: "Return all equipment models." })
  findAll(@Pagination() pagination: any) {
    return this.equipmentModelService.findAll(pagination);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get equipment model by id" })
  @ApiResponse({ status: 200, description: "Return the equipment model." })
  @ApiResponse({ status: 404, description: "Equipment model not found." })
  findOne(@Param("id") id: string) {
    return this.equipmentModelService.findOne(+id);
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Update equipment model by id" })
  @ApiResponse({
    status: 200,
    description: "The equipment model has been successfully updated.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 404, description: "Equipment model not found." })
  update(
    @Param("id") id: string,
    @Body() updateEquipmentModelDto: UpdateEquipmentModelDto
  ) {
    return this.equipmentModelService.update(+id, updateEquipmentModelDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete equipment model by id" })
  @ApiResponse({
    status: 200,
    description: "The equipment model has been successfully deleted.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 404, description: "Equipment model not found." })
  remove(@Param("id") id: string) {
    return this.equipmentModelService.remove(+id);
  }

  @Get("type/:typeId")
  @ApiOperation({ summary: "Get equipment models by type" })
  @ApiResponse({
    status: 200,
    description: "Return equipment models for the type.",
  })
  findByType(@Param("typeId") typeId: string) {
    return this.equipmentModelService.findByType(+typeId);
  }
}
