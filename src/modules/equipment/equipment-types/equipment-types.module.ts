import { Module } from "@nestjs/common";
import { EquipmentTypeService } from "./equipment-type.service";
import { EquipmentTypeController } from "./equipment-type.controller";
import { EquipmentTypesResolver } from "./equipment-types.resolver";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [EquipmentTypeController],
    providers: [EquipmentTypeService, EquipmentTypesResolver],
    exports: [EquipmentTypeService],
})
export class EquipmentTypesModule { }
