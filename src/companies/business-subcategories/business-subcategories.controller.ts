// filepath: sae-backend/src/companies/business-subcategories/business-subcategories.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusinessSubcategoriesService } from './business-subcategories.service';
import { CreateBusinessSubCategoryDto } from './dto/create-business-subcategory.dto';
import { UpdateBusinessSubCategoryDto } from './dto/update-business-subcategory.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';

@ApiTags('business-subcategories')
@Controller('companies/subcategories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BusinessSubcategoriesController {
  constructor(private readonly service: BusinessSubcategoriesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List business subcategories by category id' })
  findAll(@Query('categoryId') categoryId?: string) {
    if (categoryId) return this.service.findAllByCategory(Number(categoryId));
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get subcategory by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create business subcategory' })
  @ApiResponse({ status: 201, description: 'Subcategory created successfully' })
  create(@Body() dto: CreateBusinessSubCategoryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update business subcategory' })
  update(@Param('id') id: string, @Body() dto: UpdateBusinessSubCategoryDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete business subcategory' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
