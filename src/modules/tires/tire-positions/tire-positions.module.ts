// filepath: sae-backend/src/modules/tires/tire-positions/tire-positions.module.ts
import { Module } from "@nestjs/common";
import { TirePositionsService } from "./tire-positions.service";
import { TirePositionsController } from "./tire-positions.controller";
import { PrismaService } from "@prisma/prisma.service";

@Module({
  controllers: [TirePositionsController],
  providers: [TirePositionsService, PrismaService],
  exports: [TirePositionsService],
})
export class TirePositionsModule {}
