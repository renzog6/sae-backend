// filepath: sae-backend/src/companies/business-subcategories/business-subcategories.module.ts
import { Module } from '@nestjs/common';
import { BusinessSubcategoriesService } from './business-subcategories.service';
import { BusinessSubcategoriesController } from './business-subcategories.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessSubcategoriesController],
  providers: [BusinessSubcategoriesService],
  exports: [BusinessSubcategoriesService],
})
export class BusinessSubcategoriesModule {}
