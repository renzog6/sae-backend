//filepath: sae-backend/src/tires/tire-rotations/tire-rotations.module.ts
import { Module } from "@nestjs/common";
import { TireRotationsService } from "./tire-rotations.service";
import { TireRotationsController } from "./tire-rotations.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [TireRotationsController],
  providers: [TireRotationsService, PrismaService],
  exports: [TireRotationsService],
})
export class TireRotationsModule {}
