// filepath: sae-backend/src/modules/users/controllers/users.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { ApiPaginatedResponse } from "@common/decorators/paginated.decorator"; // Asegúrate de importar

import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { BaseQueryDto } from "@common/dto";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController extends BaseController<User> {
  constructor(protected readonly usersService: UsersService) {
    // Cambiar a protected
    super(usersService, User, "User");
  }

  // --- Sobrescribimos findAll con decoradores ---
  @Get()
  @ApiOperation({ summary: "Get all users with pagination" })
  @ApiPaginatedResponse(User) // Agregar para paginación
  override findAll(
    @Query() query: BaseQueryDto,
    @Query("companyId") companyId?: string
  ) {
    return this.usersService.findAll(
      query,
      companyId ? Number(companyId) : undefined
    );
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }
}
