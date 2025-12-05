// filepath: sae-backend/src/modules/catalogs/units/units.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { UnitsService } from "./units.service";
import { Unit } from "./entities/unit.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("units")
@ApiBearerAuth()
@Controller("units")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UnitsController extends BaseController<Unit> {
  constructor(private readonly unitsService: UnitsService) {
    super(unitsService, Unit, "Unit");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }
}
