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
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { EmployeePositionsService } from "./employee-positions.service";
import { CreateEmployeePositionDto } from "./dto/create-employee-position.dto";
import { UpdateEmployeePositionDto } from "./dto/update-employee-position.dto";
import { PaginationDto } from "@common/dto/pagination.dto";

@ApiTags("employee-positions")
@Controller("employee-positions")
export class EmployeePositionsController {
  constructor(
    private readonly employeePositionsService: EmployeePositionsService
  ) {}

  @Post()
  create(@Body() createEmployeePositionDto: CreateEmployeePositionDto) {
    return this.employeePositionsService
      .create(createEmployeePositionDto)
      .then((data) => ({ data }));
  }

  @Get()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  findAll(@Query() query: PaginationDto) {
    return this.employeePositionsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeePositionsService
      .findOne(+id)
      .then((data) => ({ data }));
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeePositionDto: UpdateEmployeePositionDto
  ) {
    return this.employeePositionsService
      .update(+id, updateEmployeePositionDto)
      .then((data) => ({ data }));
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeePositionsService.remove(+id).then((data) => ({ data }));
  }
}
