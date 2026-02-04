import { Module } from "@nestjs/common";
import { EquipmentModelService } from "./equipment-model.service";
import { EquipmentModelController } from "./equipment-model.controller";
import { EquipmentModelsResolver } from "./equipment-models.resolver";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [EquipmentModelController],
    providers: [EquipmentModelService, EquipmentModelsResolver],
    exports: [EquipmentModelService],
})
export class EquipmentModelsModule { }
