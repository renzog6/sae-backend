// filepath: sae-backend/src/modules/users/controllers/users.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import {
  Controller,
  Get,
  Query,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from "@nestjs/swagger";
import { ApiPaginatedResponse } from "@common/decorators/paginated.decorator";

import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BaseQueryDto } from "@common/dto";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController extends BaseController<User> {
  constructor(protected readonly usersService: UsersService) {
    super(usersService, User, "User");
  }

  @Get()
  @ApiOperation({
    summary: "Get all users with pagination",
    description:
      "Retrieves a paginated list of users based on query parameters such as page, limit, search, and filters. Supports optional company filtering.",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: "number",
    description: "Page number (1-based)",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: "number",
    description: "Items per page",
  })
  @ApiQuery({
    name: "q",
    required: false,
    type: "string",
    description: "Search query for email, name, or username",
  })
  @ApiQuery({
    name: "companyId",
    required: false,
    type: "number",
    description: "Filter users by company ID",
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    type: "string",
    description: "Sort field",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    type: "string",
    description: "Sort order (asc/desc)",
  })
  @ApiPaginatedResponse(User)
  override findAll(
    @Query() query: BaseQueryDto,
    @Query("companyId") companyId?: string
  ) {
    return this.usersService.findAll(
      query,
      companyId ? Number(companyId) : undefined
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get user by ID",
    description: "Retrieves a specific user by their unique identifier.",
  })
  override findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create new user",
    description:
      "Creates a new user with the provided data including email, password, name, and role.",
  })
  override create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Update existing user",
    description: "Updates an existing user with the provided data.",
  })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Delete user (soft delete if applicable)",
    description:
      "Deletes a user by ID. If the model supports soft deletion, the user will be marked as deleted rather than permanently removed.",
  })
  override remove(id: number) {
    return super.remove(id);
  }
}
