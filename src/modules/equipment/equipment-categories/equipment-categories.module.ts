import { Module } from "@nestjs/common";
import { EquipmentCategoryService } from "./equipment-category.service";
import { EquipmentCategoryController } from "./equipment-category.controller";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [EquipmentCategoryController],
    providers: [EquipmentCategoryService],
    exports: [EquipmentCategoryService],
})
export class EquipmentCategoriesModule { }
