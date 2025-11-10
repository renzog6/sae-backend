// filepath: sae-backend/src/modules/catalogs/brands/brands.controller.ts
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
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { BaseQueryDto } from "@common/dto/base-query.dto";

@ApiTags("brands")
@Controller("brands")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new brand" })
  @ApiResponse({ status: 201, description: "Brand created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto).then((data) => ({ data }));
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all brands" })
  @ApiResponse({ status: 200, description: "Brands retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.brandsService.findAll(query);
  }

  @Get(":id(\\d+)")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a brand by ID" })
  @ApiResponse({ status: 200, description: "Brand retrieved successfully" })
  @ApiResponse({ status: 404, description: "Brand not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.brandsService.findOne(id).then((data) => ({ data }));
  }

  @Patch(":id(\\d+)")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a brand" })
  @ApiResponse({ status: 200, description: "Brand updated successfully" })
  @ApiResponse({ status: 404, description: "Brand not found" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto
  ) {
    return this.brandsService
      .update(id, updateBrandDto)
      .then((data) => ({ data }));
  }

  @Delete(":id(\\d+)")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a brand (soft delete)" })
  @ApiResponse({ status: 200, description: "Brand deleted successfully" })
  @ApiResponse({ status: 404, description: "Brand not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.brandsService.remove(id).then((data) => ({ data }));
  }

  @Patch(":id(\\d+)/restore")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Restore a deleted brand" })
  @ApiResponse({ status: 200, description: "Brand restored successfully" })
  @ApiResponse({ status: 404, description: "Brand not found" })
  restore(@Param("id", ParseIntPipe) id: number) {
    return this.brandsService.restore(id).then((data) => ({ data }));
  }
}
