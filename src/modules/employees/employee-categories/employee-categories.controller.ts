import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { EmployeeCategoriesService } from "./employee-categories.service";
import { CreateEmployeeCategoryDto } from "./dto/create-employee-category.dto";
import { EmployeeCategory } from "./entities/employee-category.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { ParseIntPipe } from "@nestjs/common";
import { UpdateEmployeeCategoryDto } from "./dto/update-employee-category.dto";

@ApiTags("employee-categories")
@Controller("employee-categories")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmployeeCategoriesController extends BaseController<EmployeeCategory> {
  constructor(
    private readonly categoriesService: EmployeeCategoriesService
  ) {
    super(categoriesService, EmployeeCategory, "EmployeeCategory");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create a new employee category",
    description:
      "Creates a new employee category with the provided name, code, and details.",
  })
  @ApiBody({ type: CreateEmployeeCategoryDto })
  @ApiResponse({
    status: 201,
    description: "Employee category created successfully",
  })
  override create(@Body() createEmployeeCategoryDto: CreateEmployeeCategoryDto) {
    return this.categoriesService.create(createEmployeeCategoryDto);
  }

  // Standard CRUD methods inherited
  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateEmployeeCategoryDto) {
    return super.update(id, dto);
  }
}
