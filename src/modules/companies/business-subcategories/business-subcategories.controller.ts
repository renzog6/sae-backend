// filepath: sae-backend/src/modules/companies/business-subcategories/business-subcategories.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BusinessSubcategoriesService } from "./business-subcategories.service";
import { BusinessSubCategory } from "./entities/business-subcategory.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";
import { Body, Post, Put, Param, ParseIntPipe } from "@nestjs/common";
import { CreateBusinessSubCategoryDto } from "./dto/create-business-subcategory.dto";
import { UpdateBusinessSubCategoryDto } from "./dto/update-business-subcategory.dto";

@ApiTags("business-subcategories")
@Controller("business-subcategories")
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
  @Post()
  create(@Body() dto: CreateBusinessSubCategoryDto) {
    return super.create(dto);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateBusinessSubCategoryDto) {
    return super.update(id, dto);
  }
}
