//filepath: sae-backend/src/tires/tire-sizes/tire-sizes.module.ts
import { Module } from "@nestjs/common";
import { TireSizesService } from "./tire-sizes.service";
import { TireSizesController } from "./tire-sizes.controller";
import { TireSizesResolver } from "./tire-sizes.resolver";
import { PrismaService } from "@prisma/prisma.service";

@Module({
  controllers: [TireSizesController],
  providers: [TireSizesService, TireSizesResolver, PrismaService],
  exports: [TireSizesService],
})
export class TireSizesModule { }
