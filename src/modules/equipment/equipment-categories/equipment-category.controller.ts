// filepath: sae-backend/src/modules/equipment/controllers/equipment-category.controller.ts
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
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { EquipmentCategoryService } from "./equipment-category.service";
import { CreateEquipmentCategoryDto } from "./dto/create-equipment-category.dto";
import { EquipmentCategory } from "./entity/equipment-category.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-categories")
@Controller("equipment-categories")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EquipmentCategoryController extends BaseController<EquipmentCategory> {
  constructor(private readonly categoryService: EquipmentCategoryService) {
    super(categoryService, EquipmentCategory, "EquipmentCategory");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create a new equipment category",
    description: "Creates a new equipment category with the provided name and details.",
  })
  @ApiBody({ type: CreateEquipmentCategoryDto })
  @ApiResponse({
    status: 201,
    description: "Equipment category created successfully",
  })
  override create(@Body() createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    return this.categoryService.create(createEquipmentCategoryDto);
  }
}
