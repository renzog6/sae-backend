// filepath: sae-backend/src/modules/companies/business-categories/business-categories.module.ts
import { Module } from "@nestjs/common";
import { BusinessCategoriesService } from "./business-categories.service";
import { BusinessCategoriesController } from "./business-categories.controller";
import { PrismaModule } from "@prisma/prisma.module";

import { BusinessCategoriesResolver } from "./business-categories.resolver";

@Module({
  imports: [PrismaModule],
  controllers: [BusinessCategoriesController],
  providers: [BusinessCategoriesService, BusinessCategoriesResolver],
  exports: [BusinessCategoriesService],
})
export class BusinessCategoriesModule { }
