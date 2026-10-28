// filepath: sae-backend/src/modules/companies/business-categories/business-categories.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BusinessCategoriesService } from "./business-categories.service";
import { BusinessCategory } from "./entities/business-category.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";
import { Body, Post, Put, Param, ParseIntPipe } from "@nestjs/common";
import { CreateBusinessCategoryDto } from "./dto/create-business-category.dto";
import { UpdateBusinessCategoryDto } from "./dto/update-business-category.dto";

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
  @Post()
  create(@Body() dto: CreateBusinessCategoryDto) {
    return super.create(dto);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateBusinessCategoryDto) {
    return super.update(id, dto);
  }
}
