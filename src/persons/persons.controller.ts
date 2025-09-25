import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto).then((data) => ({ data }));
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() query: PaginationDto) {
    return this.personsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id).then((data) => ({ data }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto).then((data) => ({ data }));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id).then((data) => ({ data }));
  }
}
