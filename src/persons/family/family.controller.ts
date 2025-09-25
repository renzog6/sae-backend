import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';

@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Post()
  create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familyService.create(createFamilyDto).then((data) => ({ data }));
  }

  @Get()
  findAll() {
    return this.familyService.findAll().then((data) => ({ data }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyService.findOne(+id).then((data) => ({ data }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familyService.update(+id, updateFamilyDto).then((data) => ({ data }));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyService.remove(+id).then((data) => ({ data }));
  }
}
