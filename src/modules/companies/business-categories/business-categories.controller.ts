// filepath: sae-backend/src/modules/companies/business-categories/business-categories.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BusinessCategoriesService } from "./business-categories.service";
import { BusinessCategory } from "./entities/business-category.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("business-categories")
@Controller("business-categories")
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
