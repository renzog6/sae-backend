// filepath: sae-backend/src/modules/catalogs/units/units.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

import { UnitsService } from "./units.service";
import { Unit } from "./entities/unit.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("units")
@Controller("units")
export class UnitsController extends BaseController<Unit> {
  constructor(private readonly unitsService: UnitsService) {
    super(unitsService, Unit, "Unit");
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete unit" })
  @ApiParam({ name: "id", type: "number" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return super.remove(id);
  }
}
