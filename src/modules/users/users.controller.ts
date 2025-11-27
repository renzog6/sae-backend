// filepath: sae-backend/src/modules/users/controllers/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Logger,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { AuthService } from "src/auth/auth.service";

@ApiTags("users")
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(AuthService.name);

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    schema: {
      type: "object",
      properties: { data: { $ref: "#/components/schemas/User" } },
    },
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 409, description: "Email already in use" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Users retrieved successfully" })
  findAll(
    @Query() query: BaseQueryDto,
    @Query("companyId") companyId?: string
  ) {
    return this.usersService.findAll(query, companyId ? +companyId : undefined);
  }

  @Get(":id")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiResponse({
    status: 200,
    description: "User retrieved successfully",
    schema: {
      type: "object",
      properties: { data: { $ref: "#/components/schemas/User" } },
    },
  })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({
    status: 200,
    description: "User updated successfully",
    schema: {
      type: "object",
      properties: { data: { $ref: "#/components/schemas/User" } },
    },
  })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiResponse({ status: 409, description: "Email already in use" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  @ApiResponse({ status: 404, description: "User not found" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
