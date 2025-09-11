import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles, Role } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Pagination } from '../common/decorators/pagination.decorator';

@ApiTags('equipment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Create a new equipment' })
  @ApiResponse({ status: 201, description: 'The equipment has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all equipment with pagination' })
  @ApiResponse({ status: 200, description: 'Return all equipment.' })
  findAll(
    @Pagination() { page, limit }: { page: number; limit: number },
    @Query('companyId') companyId?: number,
  ) {
    return this.equipmentService.findAll(page, limit, companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get equipment by id' })
  @ApiResponse({ status: 200, description: 'Return the equipment.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Update equipment by id' })
  @ApiResponse({ status: 200, description: 'The equipment has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete equipment by id' })
  @ApiResponse({ status: 200, description: 'The equipment has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  remove(@Param('id') id: string) {
    return this.equipmentService.remove(+id);
  }

  @Get('categories/all')
  @ApiOperation({ summary: 'Get all equipment categories' })
  @ApiResponse({ status: 200, description: 'Return all equipment categories.' })
  findCategories() {
    return this.equipmentService.findCategories();
  }

  @Get('types/all')
  @ApiOperation({ summary: 'Get all equipment types' })
  @ApiResponse({ status: 200, description: 'Return all equipment types.' })
  findTypes(@Query('categoryId') categoryId?: number) {
    return this.equipmentService.findTypes(categoryId);
  }

  @Get('models/all')
  @ApiOperation({ summary: 'Get all equipment models' })
  @ApiResponse({ status: 200, description: 'Return all equipment models.' })
  findModels(@Query('typeId') typeId?: number) {
    return this.equipmentService.findModels(typeId);
  }
}