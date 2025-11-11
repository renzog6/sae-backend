// filepath: sae-backend/src/modules/companies/business-categories/business-categories.controller.ts
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
import { BusinessCategoriesService } from "./business-categories.service";
import { CreateBusinessCategoryDto } from "./dto/create-business-category.dto";
import { UpdateBusinessCategoryDto } from "./dto/update-business-category.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { BaseQueryDto } from "@common/dto/base-query.dto";

@ApiTags("business-categories")
@Controller("companies/categories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BusinessCategoriesController {
  constructor(private readonly service: BusinessCategoriesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all business categories" })
  @ApiResponse({
    status: 200,
    description: "Business categories retrieved successfully",
  })
  findAll(@Query() query: BaseQueryDto) {
    return this.service.findAll(query);
  }

  @Get(":id(\\d+)")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a business category by ID" })
  @ApiResponse({
    status: 200,
    description: "Business category retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Business category not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id).then((data) => ({ data }));
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new business category" })
  @ApiResponse({
    status: 201,
    description: "Business category created successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() dto: CreateBusinessCategoryDto) {
    return this.service.create(dto).then((data) => ({ data }));
  }

  @Patch(":id(\\d+)")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a business category" })
  @ApiResponse({
    status: 200,
    description: "Business category updated successfully",
  })
  @ApiResponse({ status: 404, description: "Business category not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateBusinessCategoryDto
  ) {
    return this.service.update(id, dto).then((data) => ({ data }));
  }

  @Delete(":id(\\d+)")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a business category (soft delete)" })
  @ApiResponse({
    status: 200,
    description: "Business category deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Business category not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id).then((data) => ({ data }));
  }

  @Patch(":id(\\d+)/restore")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Restore a deleted business category" })
  @ApiResponse({
    status: 200,
    description: "Business category restored successfully",
  })
  @ApiResponse({ status: 404, description: "Business category not found" })
  restore(@Param("id", ParseIntPipe) id: number) {
    return this.service.restore(id).then((data) => ({ data }));
  }
}
