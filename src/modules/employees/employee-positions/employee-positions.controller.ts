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
import { EmployeePositionsService } from "./employee-positions.service";
import { CreateEmployeePositionDto } from "./dto/create-employee-position.dto";
import { UpdateEmployeePositionDto } from "./dto/update-employee-position.dto";
import { EmployeePosition } from "./entities/employee-position.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("employee-positions")
@Controller("employee-positions")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmployeePositionsController extends BaseController<EmployeePosition> {
  constructor(
    private readonly positionsService: EmployeePositionsService
  ) {
    super(positionsService, EmployeePosition, "EmployeePosition");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create a new employee position",
    description:
      "Creates a new employee position with the provided name and details.",
  })
  @ApiBody({ type: CreateEmployeePositionDto })
  @ApiResponse({
    status: 201,
    description: "Employee position created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  override create(@Body() createEmployeePositionDto: CreateEmployeePositionDto) {
    return this.positionsService.create(createEmployeePositionDto);
  }

  // Standard CRUD methods inherited
}
