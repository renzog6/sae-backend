// filepath: sae-backend/src/modules/catalogs/brands/brands.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BrandsService } from "./brands.service";
import { Brand } from "./entities/brand.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("brands")
@Controller("brands")
export class BrandsController extends BaseController<Brand> {
  constructor(private readonly brandsService: BrandsService) {
    super(brandsService, Brand, "Brand");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }
}
