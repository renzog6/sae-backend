// filepath: sae-backend/src/modules/users/controllers/users.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("users")
@Controller("users")
export class UsersController extends BaseController<User> {
  constructor(protected readonly usersService: UsersService) {
    super(usersService, User, "User");
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete user" })
  @ApiParam({ name: "id", type: "number" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return super.remove(id);
  }
}
