// filepath: sae-backend/src/modules/users/controllers/users.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BaseQueryDto } from "@common/dto/base-query.dto";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("users")
@Controller("users")
export class UsersController extends BaseController<User> {
  constructor(protected readonly usersService: UsersService) {
    super(usersService, User, "User");
  }

  // El listado expone emails y roles de toda la organización: sólo ADMIN.
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "List users" })
  override findAll(@Query() query: BaseQueryDto) {
    return super.findAll(query);
  }

  // Se sobreescriben create/update para dos cosas que el genérico no daba:
  //  1. @Body() con un DTO concreto: el ValidationPipe se saltea la validación
  //     cuando el metatipo es `any`/Object, así que el body entraba sin validar.
  //  2. @Roles(ADMIN): sin esto, cualquier usuario autenticado podía crear una
  //     cuenta con role=ADMIN (el service hace `...createUserDto`).
  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Create user" })
  create(@Body() dto: CreateUserDto) {
    return super.create(dto);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Update user" })
  @ApiParam({ name: "id", type: "number" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return super.update(id, dto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete user" })
  @ApiParam({ name: "id", type: "number" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return super.remove(id);
  }
}
