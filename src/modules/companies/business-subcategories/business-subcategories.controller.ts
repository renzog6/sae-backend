// filepath: sae-backend/src/modules/companies/business-subcategories/business-subcategories.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { BusinessSubcategoriesService } from "./business-subcategories.service";
import { BusinessSubCategory } from "./entities/business-subcategory.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("business-subcategories")
@ApiBearerAuth()
@Controller("companies/subcategories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BusinessSubcategoriesController extends BaseController<BusinessSubCategory> {
  constructor(protected readonly service: BusinessSubcategoriesService) {
    super(service, BusinessSubCategory, "BusinessSubCategory");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }

  @Roles(Role.ADMIN)
  override restore(id: number) {
    return super.restore(id);
  }
}
