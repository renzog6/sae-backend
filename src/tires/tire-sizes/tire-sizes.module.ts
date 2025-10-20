//filepath: sae-backend/src/tires/tire-sizes/tire-sizes.module.ts
import { Module } from "@nestjs/common";
import { TireSizesService } from "./tire-sizes.service";
import { TireSizesController } from "./tire-sizes.controller";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [TireSizesController],
  providers: [TireSizesService, PrismaService],
  exports: [TireSizesService],
})
export class TireSizesModule {}
