import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { EmployeeCategoriesService } from "./employee-categories.service";
import { CreateEmployeeCategoryDto } from "./dto/create-employee-category.dto";
import { UpdateEmployeeCategoryDto } from "./dto/update-employee-category.dto";
import { PaginationDto } from "@common/dto/pagination.dto";

@ApiTags("employee-categories")
@Controller("employee-categories")
export class EmployeeCategoriesController {
  constructor(
    private readonly employeeCategoriesService: EmployeeCategoriesService
  ) {}

  @Post()
  create(@Body() createEmployeeCategoryDto: CreateEmployeeCategoryDto) {
    return this.employeeCategoriesService
      .create(createEmployeeCategoryDto)
      .then((data) => ({ data }));
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.employeeCategoriesService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeCategoriesService
      .findOne(+id)
      .then((data) => ({ data }));
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeCategoryDto: UpdateEmployeeCategoryDto
  ) {
    return this.employeeCategoriesService
      .update(+id, updateEmployeeCategoryDto)
      .then((data) => ({ data }));
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeCategoriesService
      .remove(+id)
      .then((data) => ({ data }));
  }
}
