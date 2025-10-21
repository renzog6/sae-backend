// filepath: sae-backend/src/tires/equipment-axles/equipment-axles.module.ts
import { Module } from "@nestjs/common";
import { EquipmentAxlesService } from "./equipment-axles.service";
import { EquipmentAxlesController } from "./equipment-axles.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [EquipmentAxlesController],
  providers: [EquipmentAxlesService, PrismaService],
  exports: [EquipmentAxlesService],
})
export class EquipmentAxlesModule {}
