// filepath: sae-backend/src/modules/companies/business-subcategories/business-subcategories.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BusinessSubcategoriesService } from "./business-subcategories.service";
import { CreateBusinessSubCategoryDto } from "./dto/create-business-subcategory.dto";
import { UpdateBusinessSubCategoryDto } from "./dto/update-business-subcategory.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { BaseQueryDto } from "@common/dto/base-query.dto";

@ApiTags("business-subcategories")
@Controller("companies/subcategories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BusinessSubcategoriesController {
  constructor(private readonly service: BusinessSubcategoriesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all business subcategories" })
  @ApiResponse({
    status: 200,
    description: "Business subcategories retrieved successfully",
  })
  findAll(@Query() query?: BaseQueryDto) {
    return this.service.findAll(query || new BaseQueryDto());
  }

  @Get(":id(\\d+)")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a business subcategory by ID" })
  @ApiResponse({
    status: 200,
    description: "Business subcategory retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Business subcategory not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id).then((data) => ({ data }));
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new business subcategory" })
  @ApiResponse({
    status: 201,
    description: "Business subcategory created successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() dto: CreateBusinessSubCategoryDto) {
    return this.service.create(dto).then((data) => ({ data }));
  }

  @Patch(":id(\\d+)")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a business subcategory" })
  @ApiResponse({
    status: 200,
    description: "Business subcategory updated successfully",
  })
  @ApiResponse({ status: 404, description: "Business subcategory not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateBusinessSubCategoryDto
  ) {
    return this.service.update(id, dto).then((data) => ({ data }));
  }

  @Delete(":id(\\d+)")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a business subcategory (soft delete)" })
  @ApiResponse({
    status: 200,
    description: "Business subcategory deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Business subcategory not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id).then((data) => ({ data }));
  }

  @Patch(":id(\\d+)/restore")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Restore a deleted business subcategory" })
  @ApiResponse({
    status: 200,
    description: "Business subcategory restored successfully",
  })
  @ApiResponse({ status: 404, description: "Business subcategory not found" })
  restore(@Param("id", ParseIntPipe) id: number) {
    return this.service.restore(id).then((data) => ({ data }));
  }
}
