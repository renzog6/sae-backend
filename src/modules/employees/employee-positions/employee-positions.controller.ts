// filepath: sae-backend/src/modules/employees/employee-positions/employee-positions.controller.ts
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
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto";
import { EmployeePositionsService } from "./employee-positions.service";
import { CreateEmployeePositionDto } from "./dto/create-employee-position.dto";
import { UpdateEmployeePositionDto } from "./dto/update-employee-position.dto";

@ApiTags("employee-positions")
@Controller("employee-positions")
export class EmployeePositionsController {
  constructor(
    private readonly employeePositionsService: EmployeePositionsService
  ) {}

  @Post()
  create(@Body() createEmployeePositionDto: CreateEmployeePositionDto) {
    return this.employeePositionsService.create(createEmployeePositionDto);
  }

  @Get()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "q", required: false, type: String })
  @ApiQuery({ name: "sortBy", required: false, type: String })
  @ApiQuery({ name: "sortOrder", required: false, type: String })
  findAll(@Query() query: BaseQueryDto) {
    return this.employeePositionsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeePositionsService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeePositionDto: UpdateEmployeePositionDto
  ) {
    return this.employeePositionsService.update(+id, updateEmployeePositionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeePositionsService.remove(+id);
  }
}
