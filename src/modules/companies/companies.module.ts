import { Module } from "@nestjs/common";
import { CompaniesService } from "./services/companies.service";
import { CompaniesController } from "./controllers/companies.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { BusinessSubcategoriesModule } from "./business-subcategories/business-subcategories.module";
import { BusinessCategoriesModule } from "./business-categories/business-categories.module";

import { CompaniesResolver } from "./companies.resolver";

@Module({
  imports: [
    PrismaModule,
    BusinessSubcategoriesModule,
    BusinessCategoriesModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesResolver],
  exports: [CompaniesService],
})
export class CompaniesModule { }
