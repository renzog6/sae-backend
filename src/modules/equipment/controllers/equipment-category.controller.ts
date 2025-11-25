// filepath: sae-backend/src/modules/equipment/controllers/equipment-category.controller.ts
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
} from "@nestjs/common";
import { EquipmentCategoryService } from "../services/equipment-category.service";
import { CreateEquipmentCategoryDto } from "../dto/create-equipment-category.dto";
import { UpdateEquipmentCategoryDto } from "../dto/update-equipment-category.dto";
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

@ApiTags("equipment-categories")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("equipments/categories")
export class EquipmentCategoryController {
  constructor(
    private readonly equipmentCategoryService: EquipmentCategoryService
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Create a new equipment category" })
  @ApiResponse({
    status: 201,
    description: "The equipment category has been successfully created.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  create(@Body() createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    return this.equipmentCategoryService.create(createEquipmentCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all equipment categories with pagination" })
  @ApiResponse({ status: 200, description: "Return all equipment categories." })
  findAll(@Query() query: BaseQueryDto) {
    return this.equipmentCategoryService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get equipment category by id" })
  @ApiResponse({ status: 200, description: "Return the equipment category." })
  @ApiResponse({ status: 404, description: "Equipment category not found." })
  findOne(@Param("id") id: string) {
    return this.equipmentCategoryService.findOne(+id);
  }

  @Put(":id")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Update equipment category by id" })
  @ApiResponse({
    status: 200,
    description: "The equipment category has been successfully updated.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 404, description: "Equipment category not found." })
  update(
    @Param("id") id: string,
    @Body() updateEquipmentCategoryDto: UpdateEquipmentCategoryDto
  ) {
    return this.equipmentCategoryService.update(
      +id,
      updateEquipmentCategoryDto
    );
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete equipment category by id" })
  @ApiResponse({
    status: 200,
    description: "The equipment category has been successfully deleted.",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 404, description: "Equipment category not found." })
  remove(@Param("id") id: string) {
    return this.equipmentCategoryService.remove(+id);
  }
}
