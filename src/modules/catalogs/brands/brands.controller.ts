// filepath: sae-backend/src/modules/catalogs/brands/brands.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { BrandsService } from "./brands.service";
import { Brand } from "./entities/brand.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("brands")
@ApiBearerAuth()
@Controller("brands")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BrandsController extends BaseController<Brand> {
  constructor(private readonly brandsService: BrandsService) {
    super(brandsService, Brand, "Brand");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }
}
