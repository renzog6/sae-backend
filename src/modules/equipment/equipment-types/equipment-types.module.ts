import { Module } from "@nestjs/common";
import { EquipmentTypeService } from "./equipment-type.service";
import { EquipmentTypeController } from "./equipment-type.controller";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [EquipmentTypeController],
    providers: [EquipmentTypeService],
    exports: [EquipmentTypeService],
})
export class EquipmentTypesModule { }
