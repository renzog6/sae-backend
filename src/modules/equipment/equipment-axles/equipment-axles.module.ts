import { Module } from "@nestjs/common";
import { EquipmentAxlesService } from "./equipment-axles.service";
import { EquipmentAxlesController } from "./equipment-axles.controller";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [EquipmentAxlesController],
    providers: [EquipmentAxlesService],
    exports: [EquipmentAxlesService],
})
export class EquipmentAxlesModule { }
