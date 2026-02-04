import { Module } from "@nestjs/common";
import { EquipmentAxlesService } from "./equipment-axles.service";
import { EquipmentAxlesController } from "./equipment-axles.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { EquipmentAxlesResolver } from "./equipment-axles.resolver";

@Module({
    imports: [PrismaModule],
    controllers: [EquipmentAxlesController],
    providers: [EquipmentAxlesService, EquipmentAxlesResolver],
    exports: [EquipmentAxlesService],
})
export class EquipmentAxlesModule { }
