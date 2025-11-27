//filepath: sae-backend/src/modules/employees/controllers/employees.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { EmployeesService } from "../services/employees.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { EmployeeQueryDto } from "../dto/employee-query.dto";

@ApiTags("employees")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  findAll(@Query() query: EmployeeQueryDto) {
    return this.employeesService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeesService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeesService.remove(+id);
  }
}
