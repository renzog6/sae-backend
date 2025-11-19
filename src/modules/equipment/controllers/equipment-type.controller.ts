// filepath: sae-backend/src/modules/equipment/controllers/equipment-category.controller.ts
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
import { EquipmentTypeService } from "../services/equipment-type.services";
import { CreateEquipmentTypeDto } from "../dto/create-equipment-type.dto";
import { UpdateEquipmentTypeDto } from "../dto/update-equipment-type.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("equipment-types")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("equipments/types")
export class EquipmentTypeController {
  constructor(private readonly equipmentTypeService: EquipmentTypeService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Create a new equipment type" })
  @ApiResponse({
    status: 201,
    description: "The equipment type has been successfully created.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  create(@Body() createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypeService.create(createEquipmentTypeDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all equipment types with pagination" })
  @ApiResponse({ status: 200, description: "Return all equipment types." })
  findAll(@Query() query: BaseQueryDto) {
    return this.equipmentTypeService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get equipment type by id" })
  @ApiResponse({ status: 200, description: "Return the equipment type." })
  @ApiResponse({ status: 404, description: "Equipment type not found." })
  findOne(@Param("id") id: string) {
    return this.equipmentTypeService.findOne(+id);
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Update equipment type by id" })
  @ApiResponse({
    status: 200,
    description: "The equipment type has been successfully updated.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 404, description: "Equipment type not found." })
  update(
    @Param("id") id: string,
    @Body() updateEquipmentTypeDto: UpdateEquipmentTypeDto
  ) {
    return this.equipmentTypeService.update(+id, updateEquipmentTypeDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete equipment type by id" })
  @ApiResponse({
    status: 200,
    description: "The equipment type has been successfully deleted.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 404, description: "Equipment type not found." })
  remove(@Param("id") id: string) {
    return this.equipmentTypeService.remove(+id);
  }

  @Get("category/:categoryId")
  @ApiOperation({ summary: "Get equipment types by category" })
  @ApiResponse({
    status: 200,
    description: "Return equipment types for the category.",
  })
  findByCategory(@Param("categoryId") categoryId: string) {
    return this.equipmentTypeService.findByCategory(+categoryId);
  }
}
