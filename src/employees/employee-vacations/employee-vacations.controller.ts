import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { EmployeeVacationsService } from './employee-vacations.service';
import { CreateEmployeeVacationDto } from './dto/create-employee-vacation.dto';
import { UpdateEmployeeVacationDto } from './dto/update-employee-vacation.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('employee-vacations')
@Controller('employee-vacations')
export class EmployeeVacationsController {
  constructor(private readonly employeeVacationsService: EmployeeVacationsService) {}

  @Post()
  create(@Body() createEmployeeVacationDto: CreateEmployeeVacationDto) {
    return this.employeeVacationsService.create(createEmployeeVacationDto).then((data) => ({ data }));
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query() query: PaginationDto) {
    return this.employeeVacationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeVacationsService.findOne(+id).then((data) => ({ data }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeVacationDto: UpdateEmployeeVacationDto) {
    return this.employeeVacationsService.update(+id, updateEmployeeVacationDto).then((data) => ({ data }));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeVacationsService.remove(+id).then((data) => ({ data }));
  }
}
