// filepath: sae-backend/src/modules/catalogs/brands/brands.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

import { BrandsService } from "./brands.service";
import { Brand } from "./entities/brand.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("brands")
@Controller("brands")
export class BrandsController extends BaseController<Brand> {
  constructor(private readonly brandsService: BrandsService) {
    super(brandsService, Brand, "Brand");
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete brand" })
  @ApiParam({ name: "id", type: "number" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return super.remove(id);
  }
}
