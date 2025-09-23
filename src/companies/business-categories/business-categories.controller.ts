// filepath: sae-backend/src/companies/business-categories/business-categories.controller.ts
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusinessCategoriesService } from './business-categories.service';
import { CreateBusinessCategoryDto } from './dto/create-business-category.dto';
import { UpdateBusinessCategoryDto } from './dto/update-business-category.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles, Role } from '../../common/decorators/roles.decorator';

@ApiTags('business-categories')
@Controller('companies/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BusinessCategoriesController {
  constructor(private readonly service: BusinessCategoriesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List business categories' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get business category by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create business category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  create(@Body() dto: CreateBusinessCategoryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update business category' })
  update(@Param('id') id: string, @Body() dto: UpdateBusinessCategoryDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete business category' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
