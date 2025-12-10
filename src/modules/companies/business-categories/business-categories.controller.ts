// filepath: sae-backend/src/modules/companies/business-categories/business-categories.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { BusinessCategoriesService } from "./business-categories.service";
import { BusinessCategory } from "./entities/business-category.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("business-categories")
@ApiBearerAuth()
@Controller("companies/categories")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BusinessCategoriesController extends BaseController<BusinessCategory> {
  constructor(protected readonly service: BusinessCategoriesService) {
    super(service, BusinessCategory, "BusinessCategory");
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
