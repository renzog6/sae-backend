// filepath: sae-backend/src/modules/catalogs/units/units.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UnitsService } from "./units.service";
import { Unit } from "./entities/unit.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("units")
@Controller("units")
export class UnitsController extends BaseController<Unit> {
  constructor(private readonly unitsService: UnitsService) {
    super(unitsService, Unit, "Unit");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }
}
