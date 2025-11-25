// filepath: sae-backend/src/modules/employees/employee-categories/employee-categories.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { EmployeeCategoriesService } from "./employee-categories.service";
import { CreateEmployeeCategoryDto } from "./dto/create-employee-category.dto";
import { UpdateEmployeeCategoryDto } from "./dto/update-employee-category.dto";

@ApiTags("employee-categories")
@Controller("employee-categories")
export class EmployeeCategoriesController {
  constructor(
    private readonly employeeCategoriesService: EmployeeCategoriesService
  ) {}

  @Post()
  create(@Body() createEmployeeCategoryDto: CreateEmployeeCategoryDto) {
    return this.employeeCategoriesService.create(createEmployeeCategoryDto);
  }

  @Get()
  findAll(@Query() query: BaseQueryDto) {
    return this.employeeCategoriesService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeCategoriesService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeCategoryDto: UpdateEmployeeCategoryDto
  ) {
    return this.employeeCategoriesService.update(
      +id,
      updateEmployeeCategoryDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeCategoriesService.remove(+id);
  }
}
